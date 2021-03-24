import React, { useRef, useLayoutEffect, useState } from "react";

//icons & svg
import githubicon from "../assets/images/github.svg"
import Location from "../assets/svg/icons8-location-96.png"
import Code from "../assets/svg/icons8-code-96.png"
import Github from "../assets/svg/icons8-github-96.png"

import { useStoreContext } from "../utils/GlobalState";
import { UPDATE_USER, UPDATE_LOCATION, UPDATE_LANGUAGES } from "../utils/actions";

import { useHistory } from 'react-router-dom';
import API from '../utils/API';

function NewUser() {

/* This part below is to handle form request */
const [state, dispatch] = useStoreContext();
const [newLocation, setNewLocation] = useState(state.location);
const [newUsername, setNewUsername] = useState(state.user.username);
const [newLanguages, setNewLanguages] = useState("");

const history = useHistory();

const saveInfo = (githubAccount) => {
  API.updateUser(state.user.username,{
    github: githubAccount,
    location: newLocation,
    languages: newLanguages
  })
    .then(result =>{
      console.log(result.data)
      console.log(newLanguages)
      dispatch({
        type: UPDATE_LOCATION,
        location: newLocation
      })
      dispatch({
        type: UPDATE_LANGUAGES,
        languages: newLanguages
      })
      history.push('/')
    })
    .catch(err => console.log(err))
}

const handleSubmit = (e) =>{
  e.preventDefault();
  if(state.auth === "github") saveInfo(state.user);
  else{
    if(newUsername.trim()!== ""){
      API.getAllGithubUsers()
        .then(result =>{
          console.log(result.data)
          console.log(newUsername)
          if(result.data.indexOf(newUsername) !== -1) {
            console.log('github already registered')
            alert("Github Account Already Registered")
          }
          else{
            API.getGithub(newUsername)
            .then(result => {
              if((Object.keys(result.data).length === 0)) alert('Invalid Github Username');
              else{
                let githubAccount = result.data;
                console.log('github account:')
                console.log(githubAccount)
                dispatch({
                  type: UPDATE_USER,
                  user: githubAccount
                })
                saveInfo(githubAccount)
                  
              }
            }) 
          }
        })
      .catch(err => console.log(err))
    }
    else{
      saveInfo({})
    }
  }
  
}
/* The part above is to handle form request */

console.log(state)

  return (
    <form onSubmit={handleSubmit}>
      <section className="py-20 bg-gray-200 bg-opacity-50 h-screen">
      <div className="mx-auto container max-w-2xl md:w-3/4 shadow-md">
        <div className="bg-gray-100 p-4 border-t-2 bg-opacity-5 border-indigo-500 rounded-t">
          <div className="max-w-sm mx-auto md:w-full md:mx-0">
            <div className="inline-flex items-center space-x-4">
              <img
                className="w-10 h-10 object-cover rounded-full"
                alt="User avatar"
                src={ githubicon }
              />

              <h1 className="text-gray-600">Welcome User!</h1>
            </div>
          </div>
        </div>
        <div className="bg-white space-y-6">
          <div className="md:inline-flex space-y-4 md:space-y-0 w-full p-4 text-gray-500 items-center">
            <h2 className="md:w-1/3 max-w-sm mx-auto">Github Account</h2>
            <div className="md:w-2/3 max-w-sm mx-auto">
              <label className="text-sm text-gray-400">Github username</label>
              <div className="w-full inline-flex border">
                <div className="pt-2 w-1/12 bg-gray-100 bg-opacity-50">
                  <img
                    fill="none"
                    className="w-6 text-gray-400 mx-auto"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    src={Github}
                  >
                  </img>
                </div>
                <input
                  type="text"
                  className="w-11/12 focus:outline-none focus:text-gray-600 p-2"
                  placeholder="Github-Username"
                  value={newUsername}
                  onChange={e=>setNewUsername(e.target.value)}
                  readOnly={state.auth==="github"}
                />
              </div>
            </div>
          </div>

          <hr />
          <div className="md:inline-flex  space-y-4 md:space-y-0  w-full p-4 text-gray-500 items-center">
            <h2 className="md:w-1/3 mx-auto max-w-sm">Personal info</h2>
            <div className="md:w-2/3 mx-auto max-w-sm space-y-5">
              <div>
                <label className="text-sm text-gray-400">Location</label>
                <div className="w-full inline-flex border">
                  <div className="w-1/12 pt-2 bg-gray-100">
                    <img
                    fill="none"
                    className="w-6 text-gray-400 mx-auto"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    src={Location}
                  >
                  </img>
                  </div>
                  <input
                    type="text"
                    className="w-11/12 focus:outline-none focus:text-gray-600 p-2"
                    placeholder="Toronto, Canada"
                    value={newLocation}
                    onChange={e=>setNewLocation(e.target.value)}
                    readOnly={state.auth==="github"}
                  />
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-400">Languages</label>
                <div className="w-full inline-flex border">
                  <div className="pt-2 w-1/12 bg-gray-100">
                    <img
                    fill="none"
                    className="w-6 text-gray-400 mx-auto"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    src={Code}
                  >
                  </img>
                  </div>
                  <input
                    type="text"
                    className="w-11/12 focus:outline-none focus:text-gray-600 p-2"
                    placeholder="JavaScript, Java, Python, SQL, C#, ..."
                    value={newLanguages}
                    onChange={e=>setNewLanguages(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          
          <hr />
          <div className="md:inline-flex w-full space-y-2 md:space-y-0 pb-8 pt-4 pr-32 text-gray-500 items-center">
            <h2 className="md:w-4/12 max-w-sm mx-auto">Connect my Account!</h2>

            <div className="md:w-3/12 text-center md:pl-6">
              <button onClick={handleSubmit} className="text-white w-full mx-auto max-w-sm rounded-md text-center bg-indigo-400 py-2 px-4 inline-flex items-center focus:outline-none md:float-right">
                <svg
                  fill="none"
                  className="w-4 text-white mr-2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
    </form>
  );
}

export default NewUser;