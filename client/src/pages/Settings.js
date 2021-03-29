import React, { useEffect, useRef, useState } from "react";
import OutsideClickHandler from 'react-outside-click-handler';

import API from '../utils/API';
import axios from 'axios';
import bcrypt from 'bcryptjs';

import LANGUAGEOBJECT from '../assets/languages.json'
import { useStoreContext } from "../utils/GlobalState";
import { UPDATE_USER, UPDATE_LOCATION, UPDATE_LANGUAGES, LOGOUT } from "../utils/actions";

import LanguagesList from "../components/LanguagesList";
import { updateLocale } from "moment";

function Settings() {


  /* This part below is to handle form request */
  const [state, dispatch] = useStoreContext();
  
  const [newGithub, setNewGithub] = useState("");
  const [newLocation, setNewLocation] = useState(state.location);
  
  const [showModal, setShowModal] = React.useState(false);
  
  const [errorMsgProfile, setErrorMsgProfile] = useState("");
  const [errorMsgPassword, setErrorMsgPassword] = useState("");
  
  const [updateMsgProfile, setUpdateMsgProfile] = useState("");
  const [updateMsgPassword, setUpdateMsgPassword] = useState("");

  const [listLanguages, setListLanguages] = useState(LANGUAGEOBJECT)

  
  const currentPasswordInput = useRef();
  const new1PasswordInput = useRef();
  const new2PasswordInput = useRef();


  useEffect(()=>{
    if(state.user._json !== undefined) {
      if(state.user._json.login !== undefined) {
        setNewGithub(state.user._json.login)
      }
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
    setUpdateMsgProfile("");
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
        setUpdateMsgProfile("Profile updated");
      })
      .catch(err => console.log(err))
  }

  const handleSubmitProfile = (e) =>{
    e.preventDefault();
    if(state.auth === "github"){
      saveInfo(state.user)
    }
    else if(newGithub.trim() === ""){
      if(state.auth === "google"){
        const userData = {...state.user}
        const _json = {...userData._json};
        delete _json["login"];
        delete _json["html_url"];
        delete _json["public_repos"];
        delete _json["followers"];
        delete _json["following"];
        delete _json["bio"];
        userData._json = {..._json}
        console.log(userData)
        dispatch({
          type: UPDATE_USER,
          user: userData
        })
      }
      else{
        dispatch({
          type: UPDATE_USER,
          user: {
            username: state.localusername
          }
        })
      }
      saveInfo({})

    }
    else{
      if(state.user._json !== undefined) {
        if(state.user._json.login === newGithub.trim()) {
          return saveInfo(state.user)
        }
      }
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

                if(state.auth === "google"){
                  const userData = {...state.user}
                  const _json = {...userData._json};
                  const github_json = {
                      "login":  githubAccount._json.login,
                      "html_url": githubAccount._json.html_url,
                      "public_repos" : githubAccount._json.public_repos,
                      "followers": githubAccount._json.followers,
                      "following": githubAccount._json.following,
                      "bio": githubAccount._json.bio
                    }
                  userData._json = {..._json, ...github_json}
                  console.log(userData)
                  dispatch({
                    type: UPDATE_USER,
                    user: userData
                  })
                }
                else{
                  dispatch({
                    type: UPDATE_USER,
                    user: githubAccount
                  })
                }
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
        
        setUpdateMsgPassword("Password updated");
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
        style={{ fontSize:"2rem", textAlign:"center", fontWeight:"bolder", marginTop:"65px"}}
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
            setUpdateMsgProfile("");
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
          onChange={e=>{
            setUpdateMsgProfile("");
            setNewLocation(e.target.value)
          }}
          style={{ width:"300px", height:"30px", margin:"6px", backgroundColor:"lightgray", borderRadius:"99px", textAlign:"center" }}
        />
      <br />
      <div className="text-sm text-green-500 h-5">{updateMsgProfile}</div>
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
        disabled={state.auth === 'github' || state.auth === "google"}
        placeholder="Current password here"
        ref={currentPasswordInput}
        onChange={e => {
          setErrorMsgPassword("")
          setUpdateMsgPassword("")
        }}
        style={{  width:"300px", height:"30px", margin:"6px", backgroundColor:"lightgray", borderRadius:"99px", textAlign:"center" }}
      />
      <p style={{ paddingTop:"5px"}}>Type in NEW password:</p>
      <input 
        className="new-pass"
        type="password"
        required
        placeholder="New password here"
        disabled={state.auth === 'github' || state.auth === "google"}
        onChange={e => {
          setErrorMsgPassword("")
          setUpdateMsgPassword("")
        }}
        ref={new1PasswordInput}
        style={{  width:"300px", height:"30px", margin:"6px", backgroundColor:"lightgray", borderRadius:"99px", textAlign:"center" }}
      />
      <p style={{ paddingTop:"5px", paddingBottom:"5px"}}>Confirm NEW password:</p>
      <input 
        className="confirm-pass"
        type="password"
        required
        onChange={e => {
          setErrorMsgPassword("")
          setUpdateMsgPassword("")
        }}
        ref={new2PasswordInput}
        disabled={state.auth === 'github' || state.auth === "google"}
        placeholder="Confirm new password here"
        style={{  width:"300px", height:"30px", margin:"6px", backgroundColor:"lightgray", borderRadius:"99px", textAlign:"center" }}
      />
      <div className="text-sm h-5"><span className="text-red-500">{errorMsgPassword}</span><span className="text-green-500">{updateMsgPassword}</span></div>

      <button
        type="submit"
        disabled={state.auth === 'github' || state.auth === "google"}
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
          style={{ width:"200px",backgroundColor:"mediumvioletred", color:"white", borderRadius:"99px", marginBottom:"25px"}}
          onClick={(e)=>{
            setShowModal(true)
          }}>
          <strong>Delete Account</strong>
        </button>
      </div>


      {showModal ? (
        <>
        
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <OutsideClickHandler onOutsideClick={() => {
          console.log('clicking outisde')
          setShowModal(false)
          }}> 
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                {/* <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Modal Title
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div> */}
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                    Are you sure you want to delete your account?
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      deleteUser();
                      setShowModal(false)
                    }}
                  >
                    Yes
                  </button>
                  <button
                    className="background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
      </OutsideClickHandler>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          
        </>
      ) : null}
    </div>
  );
}

export default Settings;
