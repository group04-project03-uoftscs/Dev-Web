import React, { useRef, useEffect, useLayoutEffect, useState } from "react";
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

  return (
    <div className="container">
      <h1 className="title" style={{ backgroundColor: "blue", color:"white", fontSize: "2rem"}}>
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


      {state.jobs.length!==0 ?  state.jobs.map((job) => {
          return (
          <JobCard job={job} key={job.id}/>
          )}): 
          <div>Loading</div>
      }
    </div>
  </div>
  );
}

export default Jobs;