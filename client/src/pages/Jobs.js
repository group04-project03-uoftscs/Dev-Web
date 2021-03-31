import React, { useRef, useEffect, useLayoutEffect, useState } from "react";
import { Parallax, ParallaxLayer } from 'react-spring/renderprops-addons';
import Moment from 'moment';
import JobCard from "../components/JobCard";
import useDarkMode from './useDarkMode';

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
    findJobs(UPDATE_JOBS, "jobs", API.getJobs, state.location, "");
  }, []);

  const calculatePage = (jobList) => {
    let pages = [];
    for(let i = 0; i < parseInt(jobList.length/12)+1; i++) {
      pages.push(i+1);
    }
    setNumPages(pages)
  }

  const findJobs = (action, type, api, location, description) =>{ 
    let data = {
      description: description,
      location: (location === "") ? "remote" : location
    }
    api(data)
      .then(result => {
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
  return (
    <div className="flex flex-row flex-wrap mx-auto">
      {state.jobs.length!==0 ?  state.jobs.slice(0+12*(page-1),Math.min(state.jobs.length,12+12*(page-1))).map((job) => {
        return (
        <JobCard job={job} key={job.id}/>
        )}): 
        <div>No Result</div>
      }
    </div>
  );
}

  return (
    <Parallax className="bg-gradient-to-br from-blue-500 via-indigo-600 to-indigo-800 dark:bg-black">
      <useDarkMode />
      <ParallaxLayer factor={1} offset={0} className="dark:bg-black dark:text-white transition duration-500" />
        <ParallaxLayer factor={1} offset={1} className="dark:bg-black dark:text-white transition duration-500" />
        <ParallaxLayer factor={1} offset={2} className="dark:bg-black dark:text-white transition duration-500" />
        <ParallaxLayer factor={1} offset={3} className="dark:bg-black dark:text-white transition duration-500" />
        <ParallaxLayer factor={1} offset={4} className="dark:bg-black dark:text-white transition duration-500" />
        <ParallaxLayer factor={1} offset={5} className="dark:bg-black dark:text-white transition duration-500" />
        <ParallaxLayer factor={1} offset={6} className="dark:bg-black dark:text-white transition duration-500" />
        <ParallaxLayer factor={1} offset={7} className="dark:bg-black dark:text-white transition duration-500" />
        <ParallaxLayer factor={1} offset={8} className="dark:bg-black dark:text-white transition duration-500" />
        <ParallaxLayer factor={1} offset={9} className="dark:bg-black dark:text-white transition duration-500" />
        <ParallaxLayer factor={1} offset={10} className="dark:bg-black dark:text-white transition duration-500" />
        <ParallaxLayer factor={1} offset={11} className="dark:bg-black dark:text-white transition duration-500" />
        <ParallaxLayer factor={1} offset={12} className="dark:bg-black dark:text-white transition duration-500" />
        <ParallaxLayer factor={1} offset={13} className="dark:bg-black dark:text-white transition duration-500" />
        <ParallaxLayer factor={1} offset={14} className="dark:bg-black dark:text-white transition duration-500" />
        <ParallaxLayer factor={1} offset={15} className="dark:bg-black dark:text-white transition duration-500" />
        <ParallaxLayer factor={1} offset={16} className="dark:bg-black dark:text-white transition duration-500" />
        <ParallaxLayer factor={1} offset={17} className="dark:bg-black dark:text-white transition duration-500" />
        <ParallaxLayer factor={1} offset={18} className="dark:bg-black dark:text-white transition duration-500" />
        <ParallaxLayer factor={1} offset={19} className="dark:bg-black dark:text-white transition duration-500" />
        <ParallaxLayer factor={1} offset={20} className="dark:bg-black dark:text-white transition duration-500" />
        <ParallaxLayer factor={1} offset={21} className="dark:bg-black dark:text-white transition duration-500" />
        <ParallaxLayer offset={0} speed={0}>
          <img className="object-cover w-full h-full opacity-10" src="https://i.postimg.cc/1XydR6bn/bg-2.png"></img>
        </ParallaxLayer>
        <ParallaxLayer offset={1} speed={1}>
          <img className="object-cover w-full h-full opacity-10" src="https://i.postimg.cc/1XydR6bn/bg-2.png"></img>
        </ParallaxLayer>
        <ParallaxLayer offset={2} speed={1}>
          <img className="object-cover w-full h-full opacity-10" src="https://i.postimg.cc/1XydR6bn/bg-2.png"></img>
        </ParallaxLayer>
        <ParallaxLayer style={{ opacity: 0.2 }}>
          <svg style={{ display: 'block', width: '20%', marginLeft: '60%' }} fill="none" stroke="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path></svg>
          <svg style={{ display: 'block', width: '20%', marginLeft: '5%' }} fill="none" stroke="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path></svg>
          <svg style={{ display: 'block', width: '20%', marginLeft: '80%' }} fill="none" stroke="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path></svg>
          <svg style={{ display: 'block', width: '10%', marginLeft: '10%' }} fill="none" stroke="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path></svg>
          <svg style={{ display: 'block', width: '10%', marginLeft: '60%' }} fill="none" stroke="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path></svg>
          <svg style={{ display: 'block', width: '10%', marginLeft: '30%' }} fill="none" stroke="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path></svg>
      </ParallaxLayer>

      <div className="relative w-full h-full">
        <div className="md:px-5 px-1 py-8 ">
          <div className="flex justify-between container mx-auto">
            <div className="w-full mt-14 mb-60">
             <h1 className="logo title font-semibold" style={{ color:"white", fontSize: "2rem"}}>
                Find dev jobs in our web
              </h1>
              
              <div className="search-section">
              <form className="search-form" onSubmit={handleSubmit}>
                <div className="row flex flex-wrap mt-1 gap-y-1">
                  <div className="flex col-md-5 ">
                    <div className="form-group" id="description">
                      <input
                        type="text"
                        name="description"
                        value={description}
                        onChange={e=>setDescription(e.target.value)}
                        placeholder="Got a title in mind? Type it here"
                        className="logo bg-indigo-300 rounded-full mr-12 p-1 px-3 w-full focus:outline-none text-gray-700 placeholder-gray-600"
                      />
                    </div>
                  </div>
                  <div className="form-group flex items-center" id="location">
                      <input 
                        type="text"
                        name="location"
                        value={searchLocation}
                        onChange={e=>setsearchLocation(e.target.value)}
                        placeholder=" Enter a location"
                        className="logo bg-indigo-300 rounded-full ml-2 p-1 px-3 focus:outline-none text-gray-700 placeholder-gray-600"/>
                  </div>
                    <div className="logo flex items-center ml-3">
                      
                      <button 
                        style={{ width:"100px", height:"30px", backgroundColor:"lightgray", borderRadius:"99px"}} 
                        type="submit" 
                        className="logo btn-search focus:ring-4 focus:ring-indigo-600 focus:ring-opacity-50 focus:outline-none"
                      >
                        <strong><i className="logo devicon-github-original colored"></i> Search</strong>
                      </button>
                    </div>
                </div>
              </form>

              <div className="flex-row mx-auto pt-5 p-4">
                {
                findingJobs ? <Loading>Finding Jobs</Loading> 
                : 
                <div>
                  <Page1 page={flag}/>
                  <div className="absolute bottom-56">
                  {numPages.map(page =>(
                    <button 
                      key={`job-page-${page}`}
                      className="logo cursor-pointer hover:bg-indigo-200 px-1 py-1 text-xl focus:bg-indigo-700 focus:text-white font-semibold text-gray-800 focus:outline-none border-r-2 border-indigo-200 dark:text-white transition duration-500" 
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