import React, { useRef, useLayoutEffect } from "react";

import API from '../utils/API';
import { useStoreContext } from "../utils/GlobalState";
import { UPDATE_JOBS, FOUND_USER, LOADING, LOADED } from "../utils/actions";

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
  }
/* The part above is to handle form request */

// Used for authentication
  useLayoutEffect(() => {
    dispatch({
      type: LOADING
    })
    async function getUser() {
      const {data} = await API.getUser();
      console.log(data.hasOwnProperty('user'))
      if(data.hasOwnProperty('user')) {
        dispatch({
          type: FOUND_USER,
          user: data.user
        });
        console.log('logged: ' + state.logged)
      } else if(!data.hasOwnProperty('user')) {
        dispatch({
          type: LOADED
        })
        history.push('/login')
      }
    }
    getUser();
  }, [state.logged]);

  return (
    <div className="my-14">
      <h1>List of Jobs based on area</h1>
      <p>
        Where you at?
      </p>
    </div>
  );
}

export default Jobs;