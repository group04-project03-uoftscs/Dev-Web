import React, { useRef} from "react";

import API from '../utils/API';
import { useStoreContext } from "../utils/GlobalState";
import { UPDATE_JOBS } from "../utils/actions";

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
  }
/* The part above is to handle form request */

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