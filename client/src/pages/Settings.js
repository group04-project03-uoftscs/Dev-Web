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
    <div className="settings-tab">
      <div 
        className="section-header"
        style={{ fontSize:"2rem", textAlign:"center", fontWeight:"bolder"}}
        >
          <u>Your Account Settings</u>
      </div>
      

      <div
      className="edit-profile"
      style={{ fontSize:"1rem", textAlign:"left", paddingLeft:"90px", fontWeight:"bold"}}
      >
        <p>Edit Your Profile</p>
      


        <h4 
        className="languages"
        style={{ paddingTop:"20px" }}>
          Update your programming language flags here:
        </h4>

        <h4 
        className="location"
        style={{ paddingTop:"25px" }}
        >
          Update your location here:
        </h4>
        <input 
          className="new-location"
          type="text"
          placeholder="Enter new location here"
          style={{ width:"300px", height:"30px", margin:"6px", backgroundColor:"lightgray", borderRadius:"99px", textAlign:"center" }}
        />
      </div>

      <div 
        className="password-section"
        style={{paddingLeft:"90px", paddingTop:"20px"}}
      >
      <h2 
      className="password-notice"
      style={{ paddingTop:"25px", fontWeight:"bold"}}
      >
        Change Password (Applicable for accounts not logging in through third-party authentication service)
      </h2>
      <p style={{ paddingTop:"5px"}}>Type current password:</p>
      <input 
        className="current-pass"
        type="text"
        placeholder="Current password here"
        style={{  width:"300px", height:"30px", margin:"6px", backgroundColor:"lightgray", borderRadius:"99px", textAlign:"center" }}
      />
      <p style={{ paddingTop:"5px"}}>Type in NEW password:</p>
      <input 
        className="new-pass"
        type="text"
        placeholder="New password here"
        style={{  width:"300px", height:"30px", margin:"6px", backgroundColor:"lightgray", borderRadius:"99px", textAlign:"center" }}
      />
      <p style={{ paddingTop:"5px", paddingBottom:"5px"}}>Confirm NEW password:</p>
      <input 
        className="confirm-pass"
        type="text"
        placeholder="Confirm new password here"
        style={{  width:"300px", height:"30px", margin:"6px", backgroundColor:"lightgray", borderRadius:"99px", textAlign:"center" }}
      />
      <br />
      <button
        className="set-password"
        style={{ marginLeft:"8px", marginTop:"10px", width:"175px", backgroundColor:"lightskyblue", color:"white", borderRadius:"99px", fontWeight:"bold" }}
      >
        Save Password
      </button>
      </div> 

      <div
        className="danger-zone"
        style={{ textAlign:"center"}}
      >
        <h2
        style={{ paddingBottom:"10px" }}>::::::::::::::::::::::::::::::::::::::::::::::::: EXTRA CARE BEYOND THIS POINT ::::::::::::::::::::::::::::::::::::::::::::::::: </h2>
        <button 
          className="del-account" 
          style={{ width:"200px",backgroundColor:"mediumvioletred", color:"white", borderRadius:"99px"}}>
          <strong>Delete Account</strong>
        </button>
      </div>
    </div>
  );
}

export default Settings;
