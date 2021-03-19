import React from "react";

import { useStoreContext } from "../utils/GlobalState";
import { UPDATE_USER } from "../utils/actions";

function Settings() {

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

  return (
    <>
    <div className="my-14">
      <h1>Account Settings</h1>
      <h2>
        Edit Profile
      </h2>
      <h2>
        Change Password
      </h2>
      <h2>
        Delete Account
      </h2>
    </div>
    </>
  );
}

export default Settings;
