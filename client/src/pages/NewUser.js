import React, { useRef } from "react";

//icons & svg
import githubicon from "../assets/images/github.svg"
import Location from "../assets/svg/icons8-location-96.png"
import Code from "../assets/svg/icons8-code-96.png"
import Github from "../assets/svg/icons8-github-96.png"

import { useStoreContext } from "../utils/GlobalState";
import { UPDATE_USER } from "../utils/actions";

function NewUser() {

/* This part below is to handle form request */
const [state, dispatch] = useStoreContext();

const githubRef = useRef();
const locationRef = useRef();
const languagesRef = useRef();
const handleSubmit = (e) =>{
  e.preventDefault();
  API.updateUser({
    github: githubRef.current.value,
    location: locationRef.current.value,
    language: languagesRef.current.value
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

  return (
    <form onSubmit={handleSubmit}>
      <section class="py-20 bg-gray-200 bg-opacity-50 h-screen">
      <div class="mx-auto container max-w-2xl md:w-3/4 shadow-md">
        <div class="bg-gray-100 p-4 border-t-2 bg-opacity-5 border-indigo-500 rounded-t">
          <div class="max-w-sm mx-auto md:w-full md:mx-0">
            <div class="inline-flex items-center space-x-4">
              <img
                class="w-10 h-10 object-cover rounded-full"
                alt="User avatar"
                src={ githubicon }
              />

              <h1 class="text-gray-600">Welcome User!</h1>
            </div>
          </div>
        </div>
        <div class="bg-white space-y-6">
          <div class="md:inline-flex space-y-4 md:space-y-0 w-full p-4 text-gray-500 items-center">
            <h2 class="md:w-1/3 max-w-sm mx-auto">Github Account</h2>
            <div class="md:w-2/3 max-w-sm mx-auto">
              <label class="text-sm text-gray-400">Github username</label>
              <div class="w-full inline-flex border">
                <div class="pt-2 w-1/12 bg-gray-100 bg-opacity-50">
                  <img
                    fill="none"
                    class="w-6 text-gray-400 mx-auto"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    src={Github}
                  >
                  </img>
                </div>
                <input
                  type="email"
                  class="w-11/12 focus:outline-none focus:text-gray-600 p-2"
                  placeholder="email@example.com"
                />
              </div>
            </div>
          </div>

          <hr />
          <div class="md:inline-flex  space-y-4 md:space-y-0  w-full p-4 text-gray-500 items-center">
            <h2 class="md:w-1/3 mx-auto max-w-sm">Personal info</h2>
            <div class="md:w-2/3 mx-auto max-w-sm space-y-5">
              <div>
                <label class="text-sm text-gray-400">Location</label>
                <div class="w-full inline-flex border">
                  <div class="w-1/12 pt-2 bg-gray-100">
                    <img
                    fill="none"
                    class="w-6 text-gray-400 mx-auto"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    src={Location}
                  >
                  </img>
                  </div>
                  <input
                    type="text"
                    class="w-11/12 focus:outline-none focus:text-gray-600 p-2"
                    placeholder="Toronto, Canada"
                  />
                </div>
              </div>
              <div>
                <label class="text-sm text-gray-400">Languages</label>
                <div class="w-full inline-flex border">
                  <div class="pt-2 w-1/12 bg-gray-100">
                    <img
                    fill="none"
                    class="w-6 text-gray-400 mx-auto"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    src={Code}
                  >
                  </img>
                  </div>
                  <input
                    type="text"
                    class="w-11/12 focus:outline-none focus:text-gray-600 p-2"
                    placeholder="JavaScript, Java, Python, SQL, C#, ..."
                  />
                </div>
              </div>
            </div>
          </div>
          
          <hr />
          <div class="md:inline-flex w-full space-y-2 md:space-y-0 pb-8 pt-4 pr-32 text-gray-500 items-center">
            <h2 class="md:w-4/12 max-w-sm mx-auto">Connect my Account!</h2>

            <div class="md:w-3/12 text-center md:pl-6">
              <button onClick={handleSubmit} class="text-white w-full mx-auto max-w-sm rounded-md text-center bg-indigo-400 py-2 px-4 inline-flex items-center focus:outline-none md:float-right">
                <svg
                  fill="none"
                  class="w-4 text-white mr-2"
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