import React, { useRef, useLayoutEffect } from "react";

import API from '../utils/API';

import { useStoreContext } from "../utils/GlobalState";
import { UPDATE_USER, FOUND_USER, LOADING, LOADED } from "../utils/actions";

// Used for redirection
import { useHistory } from 'react-router-dom';

import { githubAuth } from '../functions/functions';

function Settings() {

  //Used for redirection
  const history = useHistory();

  /* This part below is to handle form request */
  const [state, dispatch] = useStoreContext();

  const githubRef = useRef();
  const locationRef = useRef();
  const languagesRef = useRef();
  const passwordRef = useRef();
  const handleSubmit = (e) =>{
    e.preventDefault();
    API.updateUser({
      github: githubRef.current.value,
      location: locationRef.current.value,
      language: languagesRef.current.value,
      password : passwordRef.current.value
    })
      .then(result =>{
        dispatch({
          type: UPDATE_USER,
          items: result.data
        })

      })
      .catch(err => console.log(err))
  }
  /* The part above is to handle form request */

  //User authentication
  useLayoutEffect(() => {
    if(state.logged) {
      return;
    } else {
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
    <>
    <div className="my-14">
      <h1>Account Settings</h1>
      <h2>
        Edit Profile
      </h2>
      <h2>
        Change Password
      </h2>
      <h2>
        Delete Account
      </h2>
    </div>
    </>
  );
}

export default Settings;
