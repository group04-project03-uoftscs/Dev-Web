import React, { useRef, useState } from "react";
import githubicon from "../assets/images/github.svg"
import googleicon from "../assets/images/google.svg"
import API from '../utils/API';
import bcrypt from 'bcryptjs';
import { useHistory } from 'react-router-dom';

function Signup() {

  const emailInput = useRef();
  const usernameInput = useRef();
  const passwordInput = useRef();

  const history = useHistory();

  const [checked, setChecked] = useState(false);

  const handleChecked = (e) => {
    return setChecked(e.target.checked);
  }

  const handleSignUp = async (e) => {
    e.preventDefault();
    console.log(checked)
    let hashedPassword = bcrypt.hashSync(passwordInput.current.value, 10);
    const body = {
      username: usernameInput.current.value,
      email: emailInput.current.value,
      password: hashedPassword,
      auth: 'local',
      location: '',
      languages: '',
      firstTime: true,
      favorites: []
    }
    console.log(body);
    const verifyUser = await API.getUserInfo(usernameInput.current.value);
    if(Object.keys(verifyUser.data).length > 0) {
      return alert('User alreaedy exists');
    }
    if(!checked) {
      return alert('Please accept our privacy policy')
    } else if(checked){
      API.signup(body)
      .then(data => history.push('/login'))
      .catch(err =>  console.log(err));
    }
  }
  
  return (
    <>
    <main className="relative w-screen h-screen bg-gray-500">
        <section className="absolute top-0 w-full h-full min-h-screen">
          <div className="mx-auto px-4 py-20 bg-gray-500">
            <div className="flex content-center items-center justify-center h-full">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
                  <div className="rounded-t mb-0 px-6 py-6">
                    <div className="text-center mb-3">
                      <h6 className="text-gray-600 text-sm font-bold">
                        Sign up with
                      </h6>
                    </div>
                    <div className="btn-wrapper text-center">
                      <button
                        className="bg-white active:bg-gray-100 text-gray-800 px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                        type="button"
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
                      <small>Or sign up with credentials</small>
                    </div>
                    <form onSubmit={handleSignUp}>
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Name
                        </label>
                        <input
                          type="email"
                          className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                          placeholder="Name"
                          ref={usernameInput}
                        />
                      </div>

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
                          ref={passwordInput}
                        />
                      </div>

                      <div>
                        <label className="inline-flex items-center cursor-pointer">
                          <input
                            id="customCheckLogin"
                            type="checkbox"
                            className="form-checkbox text-gray-800 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                            name='check'
                            onChange={handleChecked}
                          />
                          <span className="ml-2 text-sm font-semibold text-gray-700">
                            I agree with the{" "}
                            <a
                              href="#pablo"
                              className="text-blue-500"
                              onClick={(e) => e.preventDefault()}
                            >
                              Privacy Policy
                            </a>
                          </span>
                        </label>
                      </div>

                      <div className="text-center mt-6">
                        <button
                          className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                          type="submit"
                        >
                          Create Account
                        </button>
                      </div>
                    </form>
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

export default Signup;
