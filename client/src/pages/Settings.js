import React, { useEffect, useRef, useState } from "react";

import API from '../utils/API';
import axios from 'axios';
import bcrypt from 'bcryptjs';

import { useStoreContext } from "../utils/GlobalState";
import { UPDATE_USER, UPDATE_LOCATION, UPDATE_LANGUAGES, LOGOUT } from "../utils/actions";

import LanguagesList from "../components/LanguagesList";

function Settings() {


  /* This part below is to handle form request */
  const [state, dispatch] = useStoreContext();
  
  const [newGithub, setNewGithub] = useState("");
  // const [newGithub, setNewGithub] = useState(state.user._json.login || "");
  // const [newLanguages, setNewLanguages] = useState(state.languages);
  const [newLocation, setNewLocation] = useState(state.location);
  
  const [errorMsgProfile, setErrorMsgProfile] = useState("");
  const [errorMsgPassword, setErrorMsgPassword] = useState("");

  const [listLanguages, setListLanguages] = useState({
      "c": false,
      "cpp": false,
      "csharp": false,
      "css": false,
      "go": false,
      "haskell": false,
      "html": false,
      "java": false,
      "javascript": false,
      "kotlin": false,
      "lua": false,
      "php": false,
      "python": false,
      "r": false,
      "ruby": false,
      "swift": false,
      "typescript": false
  })

  
  const currentPasswordInput = useRef();
  const new1PasswordInput = useRef();
  const new2PasswordInput = useRef();


  useEffect(()=>{
    if(state.user._json !== undefined) {
      setNewGithub(state.user._json.login)
    }
    if(state.languages.length !== 0){
      const temp = {...listLanguages}
      
      state.languages.forEach(lang => {
        if(lang.trim()!== "")temp[lang] = true;
      })
      setListLanguages({...temp})
      console.log(temp)
    }    
  }, [])


  const handleChecked = (lang) => {
    console.log(lang);
    const temp = {...listLanguages}
    temp[lang] = !temp[lang];
    setListLanguages({...temp})
  }

  const saveInfo = (githubAccount) => {
    const newListLanguages = Object.keys(listLanguages).filter(lang => listLanguages[lang])
    
    API.updateUser(state.localusername,{
      github: githubAccount,
      location: newLocation,
      languages: newListLanguages
    })
      .then(result =>{
        dispatch({
          type: UPDATE_LOCATION,
          location: newLocation
        })
        dispatch({
          type: UPDATE_LANGUAGES,
          languages: newListLanguages
        })
      })
      .catch(err => console.log(err))
  }

  const handleSubmitProfile = (e) =>{
    e.preventDefault();
    if(state.auth === "github"){
      saveInfo(state.user)
    }
    else if(newGithub.trim() === ""){
      dispatch({
        type: UPDATE_USER,
        user: {
          username: state.localusername
        }
      })
      saveInfo({})

    }
    else{
      if(state.user._json !== undefined) {
        console.log('after return')
        if(state.user._json.login === newGithub.trim()) {
          return saveInfo(state.user)
        }
      }
      console.log('chekcing')
      API.getAllGithubUsers()
        .then(result =>{
          if(result.data.indexOf(newGithub.trim()) !== -1) {
            setErrorMsgProfile("Github Account Already Registered")
          }
          else{
            API.getGithub(newGithub.trim())
            .then(result => {
              if((Object.keys(result.data).length === 0)) {
                setErrorMsgProfile("Invalid Github Username");
              }
              else{
                let githubAccount = result.data;
                dispatch({
                  type: UPDATE_USER,
                  user: githubAccount
                })
                console.log(githubAccount)
                saveInfo(githubAccount)
                  
              }
            }) 
          }
        })
      .catch(err => console.log(err))
    }
  }

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

  const handleChangePassword = (e) =>{
    e.preventDefault();

    if(new1PasswordInput.current.value !== new2PasswordInput.current.value){
      return setErrorMsgPassword('Password confirmation does not match')
    }
    if(currentPasswordInput.current.value === new2PasswordInput.current.value){
      return setErrorMsgPassword('Current and new passwords are the same')
    }
    let userData = {
      username: state.localusername,
      password: currentPasswordInput.current.value
    }

    axios({
      method: 'POST',
      data: userData,
      withCredentials: true,
      url: "/user/login"
    }).then((res) => {
      if(res.data === 'Incorrect login information') {
        return setErrorMsgPassword('Current password is not correct')
      } 
      else {
        userData.password = new1PasswordInput.current.value;

        if(localStorage.getItem('user')) {
          localStorage.setItem('user', JSON.stringify(userData));
        }
        API.updateUser(userData.username, {
          password: bcrypt.hashSync(userData.password, 10)
        })
        currentPasswordInput.current.value = "";
        new1PasswordInput.current.value = "";
        new2PasswordInput.current.value = "";
      }
    });
  }

  return (
    <div className="settings-tab">
      <div 
        className="section-header"
        style={{ fontSize:"2rem", textAlign:"center", fontWeight:"bolder"}}
        >
          <u>Your Account Settings</u>
      </div>
      
    <form id="profile-form" onSubmit={handleSubmitProfile}

      className="edit-profile"
      style={{ fontSize:"1rem", textAlign:"left", paddingLeft:"90px", fontWeight:"bold"}}
      >
        <p>Edit Your Profile</p>
      
        <h4 
        className="location"
        style={{ paddingTop:"25px" }}
        >
          Update your github username:
        </h4>
        <input 
          className="new-github"
          type="text"
          placeholder="Enter new github username"
          style={{ width:"300px", height:"30px", margin:"6px", backgroundColor:"lightgray", borderRadius:"99px", textAlign:"center" }}
          value={newGithub}
          onChange={e=>{
            setNewGithub(e.target.value);
            setErrorMsgProfile("")
          }}
          disabled={state.auth === 'github'}
          readOnly={state.auth ==="github"}
        />
        <div className="text-sm text-red-500 h-2">{errorMsgProfile}</div>

        <h4 
        className="languages"
        style={{ paddingTop:"20px" }}>
          Update your programming language flags here:
        </h4>
        <div className="flex flex-row flex-wrap mx-auto">
        {Object.keys(listLanguages).map((lang, index) => {
          return(
            <LanguagesList key={index} language={lang} checked={listLanguages[lang]} handleChecked={() => {handleChecked(lang)}}/>
          )
        })}
        </div>
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
          
          value={newLocation}
          onChange={e=>setNewLocation(e.target.value)}
          style={{ width:"300px", height:"30px", margin:"6px", backgroundColor:"lightgray", borderRadius:"99px", textAlign:"center" }}
        />
      <br />
      <button
        type="submit"
        className="set-profile"
        style={{ marginLeft:"8px", marginTop:"10px", width:"175px", backgroundColor:"lightskyblue", color:"white", borderRadius:"99px", fontWeight:"bold" }}
      >
        Update Profile
      </button>

      </form>
      

      <form 
        className="password-section"
        style={{paddingLeft:"90px", paddingTop:"20px"}}
        onSubmit={handleChangePassword}
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
        required
        placeholder="Current password here"
        ref={currentPasswordInput}
        onChange={e => setErrorMsgPassword("")}
        style={{  width:"300px", height:"30px", margin:"6px", backgroundColor:"lightgray", borderRadius:"99px", textAlign:"center" }}
      />
      <p style={{ paddingTop:"5px"}}>Type in NEW password:</p>
      <input 
        className="new-pass"
        type="password"
        required
        placeholder="New password here"
        onChange={e => setErrorMsgPassword("")}
        ref={new1PasswordInput}
        style={{  width:"300px", height:"30px", margin:"6px", backgroundColor:"lightgray", borderRadius:"99px", textAlign:"center" }}
      />
      <p style={{ paddingTop:"5px", paddingBottom:"5px"}}>Confirm NEW password:</p>
      <input 
        className="confirm-pass"
        type="password"
        required
        onChange={e => setErrorMsgPassword("")}
        ref={new2PasswordInput}
        placeholder="Confirm new password here"
        style={{  width:"300px", height:"30px", margin:"6px", backgroundColor:"lightgray", borderRadius:"99px", textAlign:"center" }}
      />
      <div className="text-sm text-red-500 h-5">{errorMsgPassword}</div>

      <button
        type="submit"
        className="set-password"
        style={{ marginLeft:"8px", marginTop:"10px", width:"175px", backgroundColor:"lightskyblue", color:"white", borderRadius:"99px", fontWeight:"bold" }}
      >
        Save Password
      </button>
      </form> 

      <div
        className="danger-zone"
        style={{ textAlign:"center"}}
      >
        <h2
        style={{ paddingBottom:"10px" }}>::::::::::::::::::::::::::::::::::::::::::::::::: EXTRA CARE BEYOND THIS POINT ::::::::::::::::::::::::::::::::::::::::::::::::: </h2>
        <button 
          className="del-account" 
          style={{ width:"200px",backgroundColor:"mediumvioletred", color:"white", borderRadius:"99px"}}
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
