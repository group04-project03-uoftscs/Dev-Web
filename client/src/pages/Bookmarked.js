import React, { useState, useEffect, useLayoutEffect } from "react";
import "../styles/background.scss";

import API from '../utils/API';
import { useStoreContext } from "../utils/GlobalState";
import { FOUND_USER, LOADING, LOADED } from "../utils/actions";

// Used for redirection
import { useHistory } from 'react-router-dom';

function Bookmarked() {
  const [offsetY, setOffsetY] = useState(0);
  const handleScroll = () => setOffsetY(window.pageYOffset);

  const [state, dispatch] = useStoreContext();

  //Used for redirection
  const history = useHistory();

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Used for authentication
  // useLayoutEffect(() => {
  //   dispatch({
  //     type: LOADING
  //   })
  //   async function getUser() {
  //     const {data} = await API.getUser();
  //     console.log(data.hasOwnProperty('user'))
  //     if(data.hasOwnProperty('user')) {
  //       dispatch({
  //         type: FOUND_USER,
  //         user: data.user
  //       });
  //       console.log('logged: ' + state.logged)
  //     } else if(!data.hasOwnProperty('user')) {
  //       dispatch({
  //         type: LOADED
  //       })
  //       history.push('/login')
  //     }
  //   }
  //   getUser();
  // }, [state.logged]);

  const renderContent = () => (
    <>
      <div className="my-14">
        <h1>All Bookmarks</h1>
        <h2>
          All
        </h2>
        <h2>
          News
        </h2>
        <h2>
          Podcasts
        </h2>
        <h2>
          Jobs
        </h2>
      </div>
    </>
  );

  return (
    <div>
      <section className="Parallax">
        <div
          className="Parallax__background"
          style={{ transform: `translateY(-${offsetY * 0.5}px)` }}
        />
        <div
          className="Parallax__background-triangles"
          style={{ transform: `translateY(${offsetY * 0.8}px)` }}
        />
        <div className="Parallax__content">{renderContent()}</div>
      </section>
    </div>
  );
}

export default Bookmarked;
