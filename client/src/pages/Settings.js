import React, { useRef, useLayoutEffect } from "react";

import API from '../utils/API';

import { useStoreContext } from "../utils/GlobalState";
import { UPDATE_USER, FOUND_USER, LOADING, LOADED } from "../utils/actions";

// Used for redirection
import { useHistory } from 'react-router-dom';

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
    <>
    <div className="my-14">
      <h1><strong>Welcome to Your Account Settings</strong></h1>

      <h2>
        Edit Your Profile
      </h2>

      <h4 className="languages">
        Update your programming languages here:
      </h4>

      <h4 className="location">
        Update your location here:
      </h4>

      <h2>
        Change Password (applicable for accounts not logging in through third-party authentication)
      </h2>
      <button className="del-account" style={{ backgroundColor:"mediumvioletred", color:"white"}}>
        <strong>Delete Account</strong>
      </button>
    </div>
    </>
  );
}

export default Settings;
