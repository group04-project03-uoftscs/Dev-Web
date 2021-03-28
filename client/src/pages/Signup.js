import React, { useRef, useState } from "react";
import githubicon from "../assets/images/github.svg"
import googleicon from "../assets/images/google.svg"
import API from '../utils/API';
import bcrypt from 'bcryptjs';
import { useHistory } from 'react-router-dom';
import OutsideClickHandler from 'react-outside-click-handler';


function Signup() {

  const emailInput = useRef();
  const usernameInput = useRef();
  const passwordInput = useRef();

  const history = useHistory();

  const [checked, setChecked] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showModal, setShowModal] = React.useState(false);

  const handleChecked = (e) => {
    setErrorMsg("")
    return setChecked(e.target.checked);
  }

  const handleSignUp = async (e) => {
    e.preventDefault();
    // if(usernameInput.current.value === '') {
    //   // return alert('Please enter a password');
    //   return setErrorMsg('Please enter a usename');
    // }

    // if(passwordInput.current.value === '') {
    //   // return alert('Please enter a password');
    //   return setErrorMsg('Please enter a password');
    // }
    if(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(usernameInput.current.value) === true) {
      // return alert('Enter a valid username')
      return setErrorMsg('Enter a valid username');
    }
    let hashedPassword = bcrypt.hashSync(passwordInput.current.value, 10);
    const body = {
      username: usernameInput.current.value,
      email: emailInput.current.value,
      password: hashedPassword,
      auth: 'local',
      location: '',
      languages: '',
      firstTime: true,
      favorites: [],
      github: {}
    }
    const verifyUser = await API.getUserInfo(usernameInput.current.value);
    if(Object.keys(verifyUser.data).length > 0) {
      // return alert('User alreaedy exists');
      return setErrorMsg('User alreaedy exists');
    }
    if(!checked) {
      // return alert('Please accept our privacy policy')
      return setErrorMsg('Please accept our privacy policy');
    } else if(checked){
      API.signup(body)
      .then(data => history.push('/login'))
      .catch(err =>  console.log(err));
    }
  }
  
  return (
    <>
    <main className="relative w-full h-full min-h-screen bg-gray-500" style={{ marginTop:"30px"}}>
        <section className="absolute top-0 w-full h-full">
          <div className="mx-auto h-full w-full ">
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
                        onClick={ () => {
                          // window.location.replace('http://localhost:3001/auth/github')
                          window.location.replace('https://dev-web3.herokuapp.com/auth/github')
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
                      <small>Or sign up with credentials</small>
                    </div>
                    <form onSubmit={handleSignUp}>
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Username
                        </label>
                        <input
                          type="text"
                          className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                          placeholder="Name"
                          ref={usernameInput}
                          required
                          onChange={e => setErrorMsg("")}
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
                          required
                          onChange={e => setErrorMsg("")}
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
                          required
                          onChange={e => setErrorMsg("")}
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
                              onClick={(e) => {
                                e.preventDefault()
                                setShowModal(true)
                              }}
                            >
                              Privacy Policy
                            </a>
                          </span>
                        </label>
                      </div>

                      <div>
                          <div className="items-center">
                            <span className="ml-2 text-sm font-semibold text-red-500">
                            {errorMsg}
                            </span>
                        </div>
                        
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
                    The Dev Web application stores your Github information publically accessible to create a personal experience.
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
      </OutsideClickHandler>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          
        </>
      ) : null}
      </main>
    </>
  );
}

export default Signup;
