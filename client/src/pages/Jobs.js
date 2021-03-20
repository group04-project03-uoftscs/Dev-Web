import React, { useRef} from "react";

import API from '../utils/API';
import { useStoreContext } from "../utils/GlobalState";
import { UPDATE_JOBS } from "../utils/actions";
// import JobCard from "../components/JobCard";    ** add the component to .map the list

function Jobs() {

/* This part below is to handle form request */
  const [state, dispatch] = useStoreContext();

  const descriptionRef = useRef();
  const locationRef = useRef();
  const handleSubmit = (e) =>{
    e.preventDefault();
    API.getJobs({
      description: descriptionRef.current.value,
      location: locationRef.current.value
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

  return (
    <div className="my-14 container">
      <h1 className="margin-top margin-bottom " style={{ backgroundColor: "blue", color:"white", fontSize: "2rem"}}>
        Find dev jobs in our web
      </h1>
      
      <div className="search-section">
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-5">
            <div className="form-group" id="description">
              <input
                type="text"
                name="description"
                value={state.description || ''}
                placeholder="Got a title in mind?"
              />
            </div>
          </div>
          <div className="col-md-5">
            <div className="form-group" id="location">
              <input
                type="text"
                name="location"
                value={state.location || ''}
                placeholder="Enter a location"
              />
              </div>
          </div>
          <div className="col-md-2">
            <button variant="primary" type="submit" className="btn-search">
              Search
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
  );
}

export default Jobs;