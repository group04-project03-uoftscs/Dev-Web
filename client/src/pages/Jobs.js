import React, { useEffect, useState } from "react";
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
  const [findingJobs, setfindingJobs] = useState(true);


  useEffect(() => {
    findJobs(UPDATE_JOBS, "jobs", API.getJobs, state.location);
  }, []);

  const findJobs = (action, type, api, location) =>{ 
    console.log(`getting ${type}`)
    let data = {
      description: "",
      location: (location === "") ? "remote" : location
    }
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
              setfindingJobs(false)
            })
        }
        else{
          dispatch({ type: action, items: result.data})
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
    API.getJobs({
      description: description,
      location: searchLocation
    })
      .then(result =>{
        dispatch({
          type: UPDATE_JOBS,
          items: result.data
        })
        setfindingJobs(false)
      })
      .catch(err => {
        console.log(err)
        setfindingJobs(false)
      })
  };


  function SearchResults() {
    return (
      <div>
        {state.jobs.length!==0 ?  state.jobs.slice(0,5).map((job) => {
        return (
        <JobCard job={job} key={job.id}/>
        )}): 
        <div>No result</div>
        }
          
      </div>
    );
  }


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
    {console.log(findingJobs)}
      {findingJobs ? 
          <Loading>Finding jobs</Loading> : <SearchResults/>
      }
      
    </div>
  </div>
  );
}

export default Jobs;