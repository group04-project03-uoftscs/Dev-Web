import React, { useRef, useEffect, useLayoutEffect, useState } from "react";
import { Parallax, ParallaxLayer } from 'react-spring/renderprops-addons';
import Moment from 'moment';
import JobCard from "../components/JobCard";

import API from '../utils/API';
import { useStoreContext } from "../utils/GlobalState";
import { UPDATE_JOBS } from "../utils/actions";
import Loading from '../components/Loading'

function Jobs() {
  
  const [state, dispatch] = useStoreContext();
  const today = Moment().format("YYYY-MM-DD");

  const [searchLocation, setsearchLocation] = useState(state.location);
  const [description, setDescription] = useState("");
  const [findingJobs, setfindingJobs] = useState(state.jobs.length === 0);
  const [numPages, setNumPages] = useState([1]);
  const url = (name, wrap = false) => `${wrap ? 'url(' : ''}https://awv3node-homepage.surge.sh/build/assets/${name}.svg${wrap ? ')' : ''}`
  const [flag, setFlag] = useState(1);


  useEffect(() => {
    console.log(findingJobs)
    findJobs(UPDATE_JOBS, "jobs", API.getJobs, state.location, "");
  }, []);

  const calculatePage = (jobList) => {
    let pages = [];
    for(let i = 0; i < parseInt(jobList.length/7)+1; i++) {
      pages.push(i+1);
    }
    console.log(pages)
    setNumPages(pages)
  }

  const findJobs = (action, type, api, location, description) =>{ 
    console.log(`getting ${type}`)
    let data = {
      description: description,
      location: (location === "") ? "remote" : location
    }
    api(data)
      .then(result => {
        console.log(result)
        if(result.data.length === 0) {
          data = {
            description: description,
            location: "remote"
          }
          api(data)
            .then(result2 =>{
              dispatch({ type: action, items: result2.data})
              calculatePage(result2.data)
              setFlag(1)
              setfindingJobs(false)
            })
        }
        else{
          dispatch({ type: action, items: result.data})
          calculatePage(result.data)
          setFlag(1)
          setfindingJobs(false)
        }
        
    })
    .catch(err =>{
      console.log(err)
    });
  }
  
  const handleSubmit = (e) =>{
    setfindingJobs(true)
    e.preventDefault();
    findJobs(UPDATE_JOBS, "jobs", API.getJobs, searchLocation, description);
  };

  function Page1({page}) {
    console.log(page)
  return (
    <div className="flex flex-row flex-wrap mx-auto">
      {state.jobs.length!==0 ?  state.jobs.slice(0+9*(page-1),Math.min(state.jobs.length,9+9*(page-1))).map((job) => {
        return (
        <JobCard job={job} key={job.id}/>
        )}): 
        <div>No Result</div>
      }
    </div>
  );
}

  return (
    <Parallax>
      <ParallaxLayer factor={1} offset={0} className="bg-gradient-to-br from-yellow-300 via-indigo-500 to-blue-800" />
        <ParallaxLayer factor={1} offset={1} className="bg-gradient-to-tr from-indigo-300 via-indigo-500 to-blue-800" />
        <ParallaxLayer factor={1} offset={2} className="bg-gradient-to-br from-indigo-300 via-indigo-500 to-blue-800" />
        <ParallaxLayer factor={1} offset={3} className="bg-gradient-to-tr from-indigo-300 via-indigo-500 to-blue-800" />
        <ParallaxLayer factor={1} offset={4} className="bg-gradient-to-br from-indigo-300 via-indigo-500 to-blue-800" />
        <ParallaxLayer factor={1} offset={5} className="bg-gradient-to-tr from-indigo-300 via-indigo-500 to-blue-800" />
        <ParallaxLayer factor={1} offset={6} className="bg-gradient-to-br from-indigo-300 via-indigo-500 to-blue-800" />
        <ParallaxLayer factor={1} offset={7} className="bg-gradient-to-tr from-indigo-300 via-indigo-500 to-blue-800" />
        <ParallaxLayer factor={1} offset={8} className="bg-gradient-to-br from-indigo-300 via-indigo-500 to-blue-800" />
        <ParallaxLayer factor={1} offset={9} className="bg-gradient-to-tr from-indigo-300 via-indigo-500 to-blue-800" />
        <ParallaxLayer factor={1} offset={10} className="bg-gradient-to-br from-indigo-300 via-indigo-500 to-blue-800" />
        <ParallaxLayer factor={1} offset={11} className="bg-gradient-to-tr from-indigo-300 via-indigo-500 to-blue-800" />
        <ParallaxLayer factor={1} offset={12} className="bg-gradient-to-br from-indigo-300 via-indigo-500 to-blue-800" />
        <ParallaxLayer factor={1} offset={13} className="bg-gradient-to-tr from-indigo-300 via-indigo-500 to-blue-800" />
        <ParallaxLayer factor={1} offset={14} className="bg-gradient-to-br from-indigo-300 via-indigo-500 to-blue-800" />
        <ParallaxLayer factor={1} offset={15} className="bg-gradient-to-tr from-indigo-300 via-indigo-500 to-blue-800" />
        <ParallaxLayer factor={1} offset={16} className="bg-gradient-to-br from-indigo-300 via-indigo-500 to-blue-800" />
        <ParallaxLayer factor={1} offset={17} className="bg-gradient-to-tr from-indigo-300 via-indigo-500 to-blue-800" />
        <ParallaxLayer factor={1} offset={18} className="bg-gradient-to-br from-indigo-300 via-indigo-500 to-blue-800" />
        <ParallaxLayer factor={1} offset={19} className="bg-gradient-to-tr from-indigo-300 via-indigo-500 to-blue-800" />
        <ParallaxLayer factor={1} offset={20} className="bg-gradient-to-br from-indigo-300 via-indigo-500 to-blue-800" />
        <ParallaxLayer factor={1} offset={21} className="bg-gradient-to-tr from-indigo-300 via-indigo-500 to-blue-800" />
        <ParallaxLayer style={{ backgroundImage: url('stars', true), backgroundSize: 'cover' }} />
        <ParallaxLayer offset={1} style={{ backgroundImage: url('stars', true)}} />
        <ParallaxLayer style={{ opacity: 0.2 }}>
          <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '60%' }} />
          <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '5%' }} />
          <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '80%' }} />
          <img src={url('cloud')} style={{ display: 'block', width: '10%', marginLeft: '10%' }} />
          <img src={url('cloud')} style={{ display: 'block', width: '10%', marginLeft: '60%' }} />
          <img src={url('cloud')} style={{ display: 'block', width: '10%', marginLeft: '30%' }} />
      </ParallaxLayer>

      <div className="relative w-full h-full">
        <div className="px-6 py-8 ">
          <div className="flex justify-between container mx-auto">
            <div className="w-full mt-14 mb-60">
             <h1 className="title font-semibold" style={{ color:"white", fontSize: "2rem"}}>
                Find dev jobs in our web
              </h1>
              
              <div className="search-section">
              <form className="search-form" onSubmit={handleSubmit}>
                <div className="row flex flex-wrap">
                  <div className="flex col-md-5">
                    <div className="form-group" id="description">
                      <input
                        type="text"
                        name="description"
                        value={description}
                        onChange={e=>setDescription(e.target.value)}
                        placeholder="Got a title in mind? Type it here"
                        style={{ margin:"20px", width:"300px", backgroundColor:"lightBlue", fontWeight:"bolder", textAlign:"center", borderRadius:"99px"}}
                      />
                    </div>
                  </div>
                  <div className="flex col-md-5">
                    <div className="form-group" id="location">
                      <input
                        type="text"
                        name="location"
                        value={searchLocation}
                        onChange={e=>setsearchLocation(e.target.value)}
                        placeholder="Enter a location"
                        style={{ margin:"20px", width:"200px", backgroundColor:"lightBlue", fontWeight:"bold", textAlign:"center", borderRadius:"99px", color:"ThreeDShadow" }}
                      />
                      </div>
                  </div>
                    <div className="flex col-md-2">
                      <button 
                        style={{ width:"100px", height:"30px", margin:"16px", backgroundColor:"lightgray", borderRadius:"99px"}} 
                        type="submit" 
                        className="btn-search"
                      >
                        <strong>Search</strong>
                      </button>
                    </div>
                </div>
              </form>

              <div className="flex-row mx-auto pt-10 p-4">
                {
                findingJobs ? <Loading>Finding Jobs</Loading> 
                : 
                <div>
                  <Page1 page={flag}/>
                  <div className="absolute bottom-56">
                  {numPages.map(page =>(
                    <button 
                      key={`job-page-${page}`}
                      className="cursor-pointer hover:bg-indigo-200 px-1 py-1 text-xl focus:bg-indigo-700 focus:text-white font-semibold text-gray-700 focus:outline-none border-r-2 border-indigo-200" 
                      onClick={() => setFlag(page)}>
                      Page {page}
                    </button>
                  ))}
                </div>
                </div>
                
                }
                
               </div>
               


              
            </div>
            </div>
            
          </div>
        </div>
      </div>
  </Parallax>
  );
}

export default Jobs;