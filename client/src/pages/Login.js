import React, { useEffect, useRef } from "react";
import styles from "../styles/styles.css"
import githubicon from "../assets/images/github.svg"
import googleicon from "../assets/images/google.svg";
import API from '../utils/API';
import axios from 'axios';
import { useStoreContext } from "../utils/GlobalState";
import { AUTH_METHOD, FOUND_LOCAL_USER, FOUND_USER } from '../utils/actions';
import { useHistory } from 'react-router-dom';

function Login() {

  const [state, dispatch] = useStoreContext();
  const history = useHistory();

  useEffect(()=> {
    API.getUser()
    .then(data=>console.log(data.data.user))
    console.log(state);
  })
  const githubLogin = () => {
    fetch('/github')
  }

  const emailInput = useRef();
  const passwordInput = useRef();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    let userData = {
      username: emailInput.current.value,
      password: passwordInput.current.value
    }
    console.log(userData);

    axios({
      method: 'POST',
      data: userData,
      withCredentials: true,
      url: "/user/login"
    }).then((res) => {
      console.log(res);
      console.log(res.data)
      if(res.data === 'Incorrect login information') {
        alert('Email or password is not correct')
      } else {
        dispatch({
          type: FOUND_USER,
          user: {
            username: userData.username
          }
        });
        dispatch({
          type: AUTH_METHOD,
          auth: 'local'
        });
        history.push('/')
      }
    });
  }

  return (
    <>
      <main className="relative w-full h-full min-h-screen bg-gray-500">
        <section className="absolute top-0 w-full h-full">
          <div className="mx-auto h-full w-full">
            <div className="flex content-center items-center justify-center h-full">
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
                  <div className="rounded-t mb-0 px-6 py-6">
                    <div className="text-center mb-3">
                      <h6 className="text-gray-600 text-sm font-bold">
                        Sign in with
                      </h6>
                    </div>
                    <div className="btn-wrapper text-center">
                      <button
                        className="bg-white active:bg-gray-100 text-gray-800 px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                        type="button"
                        onClick={ () => {
                          window.location.replace('http://localhost:3001/auth/github')
                        }}
                      >
                        <img
                          alt="..."
                          className="w-5 mr-1"
                          src={ githubicon }
                        />
                        Github
                      </button>
                      <button
                        className="bg-white active:bg-gray-100 text-gray-800 px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                        type="button"
                      >
                        <img
                          alt="..."
                          className="w-5 mr-1"
                          src={ googleicon }
                        />
                        Google
                      </button>
                    </div>
                    <hr className="mt-6 border-b-1 border-gray-400" />
                  </div>
                  <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <div className="text-gray-500 text-center mb-3 font-bold">
                      <small>Or sign in with credentials</small>
                    </div>
                    <form onSubmit={handleFormSubmit}>
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                          placeholder="Email"
                          required
                          ref={emailInput}
                        />
                      </div>

                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Password
                        </label>
                        <input
                          type="password"
                          className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                          placeholder="Password"
                          required
                          ref={passwordInput}
                        />
                      </div>
                      <div>
                        <label className="inline-flex items-center cursor-pointer">
                          <input
                            id="customCheckLogin"
                            type="checkbox"
                            className="form-checkbox text-gray-800 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                          />
                          <span className="ml-2 text-sm font-semibold text-gray-700">
                            Remember me
                          </span>
                        </label>
                      </div>

                      <div className="text-center mt-6">
                        <button
                          className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                          type="submit"
                        >
                          Sign In
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="flex flex-wrap mt-6 relative">
                  <div className="w-1/2">
                    <a
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      className="text-gray-300"
                    >
                      <small>Forgot password?</small>
                    </a>
                  </div>
                  <div className="w-1/2 text-right">
                    <a href="/signup" className="text-gray-300">
                      <small>Create new account</small>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Login;
