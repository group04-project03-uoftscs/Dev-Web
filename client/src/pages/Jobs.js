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
    <div>
              <div>
                {state.jobs.length!==0 ?  state.jobs.slice(5,Math.min(state.jobs.length,7)).map((job) => {
                  return (
                    <JobCard job={job} key={job.id}/>
                  )}): 
                    <div>Loading</div>
                }
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
      {findingJobs ? 
          <Loading>Finding jobs</Loading> : <SearchResults/>
      }
    </div>

  );
}

export default Jobs;