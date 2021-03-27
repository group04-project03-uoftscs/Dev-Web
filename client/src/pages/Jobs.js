import React, { useRef, useEffect, useLayoutEffect, useState } from "react";
import { Parallax, ParallaxLayer } from 'react-spring/renderprops-addons';
import Moment from 'moment';
import JobCard from "../components/JobCard";

import API from '../utils/API';
import { useStoreContext } from "../utils/GlobalState";
import { UPDATE_JOBS, FOUND_USER, LOADING, LOADED } from "../utils/actions";

// Used for redirection
import { useHistory } from 'react-router-dom';

function Jobs() {
  
  const [state, dispatch] = useStoreContext();
console.log(state.jobs);
  const today = Moment().format("YYYY-MM-DD");

  const [searchLocation, setsearchLocation] = useState(state.location);
  const [description, setDescription] = useState("");


  useEffect(() => {
    checkLocalStorageJobs(UPDATE_JOBS, "jobs", API.getJobs, state.location);
  }, []);

  
  const checkLocalStorageJobs = (action, type, api, location) => {
    if(localStorage.getItem(type)){
      if(JSON.parse(localStorage.getItem(type)).date !== today) {
        findJobs(action, type, api,location);
      }
      else{
        
        console.log(type + ' already there')
        dispatch({ type: action, items: JSON.parse(localStorage.getItem(type)).items})
      }
    }
    else{
      findJobs(action, type, api, location);
    }
  }

  const findJobs = (action, type, api, location) =>{ 
    console.log(`getting ${type}`)
    let data = {
      description: "",
      location: (location === "") ? "remote" : location
    }
    console.log(api)
    api(data)
      .then(result => {
        console.log(result)
        if(result.data.length === 0) {
          data = {
            description: "",
            location: "remote"
          }
          api(data)
            .then(result2 =>{
              dispatch({ type: action, items: result2.data})
      
                localStorage.setItem(type , JSON.stringify({
                  date: today,
                  items: result2.data
                }))
            })
        }
        else{
          dispatch({ type: action, items: result.data})
      
          localStorage.setItem(type , JSON.stringify({
            date: today,
            items: result.data
          }))
        }
        
    })
    .catch(err =>{
      console.log(err)
    });
  }

/* This part below is to handle form request */

  const handleSubmit = (e) =>{
    e.preventDefault();
    API.getJobs({
      description: description,
      location: searchLocation
    })
      .then(result =>{
        dispatch({
          type: UPDATE_JOBS,
          items: result.data
        })
      })
      .catch(err => console.log(err))
  };
/* The part above is to handle form request */

// // Used for authentication
//   useLayoutEffect(() => {
//     dispatch({
//       type: LOADING
//     })
//     async function getUser() {
//       const {data} = await API.getUser();
//       console.log(data.hasOwnProperty('user'))
//       if(data.hasOwnProperty('user')) {
//         dispatch({
//           type: FOUND_USER,
//           user: data.user
//         });
//         console.log('logged: ' + state.logged)
//       } else if(!data.hasOwnProperty('user')) {
//         dispatch({
//           type: LOADED
//         })
//         history.push('/login')
//       }
//     }
//     getUser();
//   }, [state.logged]);

  const url = (name, wrap = false) => `${wrap ? 'url(' : ''}https://awv3node-homepage.surge.sh/build/assets/${name}.svg${wrap ? ')' : ''}`
  const [flag, setFlag] = useState(false);
  function Page1(props) {
  return (
    <div>
              <div>
                {state.jobs.length!==0 ?  state.jobs.slice(5,Math.min(state.jobs.length,7)).map((job) => {
                  return (
                  <JobCard job={job} key={job.id}/>
                  )}): 
                  <div>Loading</div>
              }
              </div>
    </div>
  );
}
function Page2(props) {
  return (
    <div>
              <div>
                {state.jobs.length!==0 ?  state.jobs.slice(0,Math.min(state.jobs.length,7)).map((job) => {
                  return (
                  <JobCard job={job} key={job.id}/>
                  )}): 
                  <div>
                    <div className="flex w-full mx-auto items-center justify-center p-4 bg-white rounded-md shadow-md">
                      <span className="text-xl tracking-wider text-gray-500 uppercase">Loading</span>
                    </div>
                  </div>
              }
              </div>
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

      <div className="relative w-full h-full ">
        <div className="px-6 py-8 ">
          <div className="flex justify-between container mx-auto">
            <div className="w-full mt-14 mb-60">
             <h1 className="title font-semibold" style={{ color:"white", fontSize: "2rem"}}>
                Find dev jobs in our web
              </h1>
              
              <div className="search-section">
              <form className="search-form" onSubmit={handleSubmit}>
                <div className="row flex">
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
                <div className="absolute bottom-56">
                  <button className="cursor-pointer hover:bg-indigo-200 px-1 py-1 text-xl focus:bg-indigo-700 focus:text-white font-semibold text-gray-700 focus:outline-none border-r-2 border-indigo-200" onClick={() => setFlag(false)}>
                    Page 1
                  </button>
                  <button className="cursor-pointer hover:bg-indigo-200 px-1 py-1 text-xl focus:bg-indigo-700 focus:text-white font-semibold text-gray-700 focus:outline-none border-l-2 border-indigo-200" onClick={() => setFlag(true)}>
                    Page 2
                  </button>
                </div>
                {flag ? <Page1 a={flag} /> : <Page2 h={flag} />}
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