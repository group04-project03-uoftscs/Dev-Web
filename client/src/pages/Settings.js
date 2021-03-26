import React, { useRef, useLayoutEffect, useState } from "react";

import API from '../utils/API';

import { useStoreContext } from "../utils/GlobalState";
import { UPDATE_USER, FOUND_USER, LOADING, LOADED, LOGOUT } from "../utils/actions";

// Used for redirection
import { useHistory } from 'react-router-dom';
import LanguagesList from "../components/LanguagesList";
import { updateLocale } from "moment";

function Settings() {

  //Used for redirection
  const history = useHistory();

  /* This part below is to handle form request */
  const [state, dispatch] = useStoreContext();
  
  // const [newGithub, setNewGithub] = useState(state.user.github.username || "");
  // const [newUsername, setNewUsername] = useState(state.user.localusername);
  // const [newLanguages, setNewLanguages] = useState(state.languages);
  // const [newLocation, setNewLocation] = useState(state.location);

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
<<<<<<< HEAD
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
=======
>>>>>>> e46e6c354db7fb9533a6f116ebb6b36d785fe02f

  const deleteUser = () => {
    console.log('deleting: '+ state.localusername)
    API.removeUser(state.localusername)
    .then(data => {
      console.log(data);
      if(localStorage.getItem('user')) {
        localStorage.removeItem('user');
      }
      dispatch({
        type: LOGOUT
      });
      fetch('/logout');
    })
  }

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
        <LanguagesList />

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
      <br />
      <button
        className="set-profile"
        style={{ marginLeft:"8px", marginTop:"10px", width:"175px", backgroundColor:"lightskyblue", color:"white", borderRadius:"99px", fontWeight:"bold" }}
      >
        Update Profile
      </button>
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
        type="password"
        placeholder="Current password here"
        style={{  width:"300px", height:"30px", margin:"6px", backgroundColor:"lightgray", borderRadius:"99px", textAlign:"center" }}
      />
      <p style={{ paddingTop:"5px"}}>Type in NEW password:</p>
      <input 
        className="new-pass"
        type="password"
        placeholder="New password here"
        style={{  width:"300px", height:"30px", margin:"6px", backgroundColor:"lightgray", borderRadius:"99px", textAlign:"center" }}
      />
      <p style={{ paddingTop:"5px", paddingBottom:"5px"}}>Confirm NEW password:</p>
      <input 
        className="confirm-pass"
        type="password"
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
          style={{ width:"200px",backgroundColor:"mediumvioletred", color:"white", borderRadius:"99px", marginBottom:"20px"}}
          onClick={() => {
            deleteUser();
          }}>
          <strong>Delete Account</strong>
        </button>
      </div>
    </div>
  );
}

export default Settings;
