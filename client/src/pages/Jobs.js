import React, { useRef, useLayoutEffect, useEffect } from "react";

import API from '../utils/API';
import { useStoreContext } from "../utils/GlobalState";
import { UPDATE_JOBS, FOUND_USER, LOADING, LOADED } from "../utils/actions";
import { checkLocalStorageHome, githubAuth } from '../functions/functions';
import axios from 'axios';

// Used for redirection
import { useHistory } from 'react-router-dom';

function Jobs() {
  //Used for redirection
  const history = useHistory();

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

// Used for authentication
useLayoutEffect(() => {
  if(state.logged) {
    return;
  } else {
    checkLocalStorageHome(axios, dispatch)
    API.getUser()
    .then(({data}) => {
      console.log(data);
      if(data.auth === 'github') {
        githubAuth(data, dispatch, API, state)
      } else if (data.auth === 'local') {
        dispatch({
          type: FOUND_USER,
          user: {...data.user}
        })
      } else {
        history.push('/landing')
      }
    })
  }
}, []);

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