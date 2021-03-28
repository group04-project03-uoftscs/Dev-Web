import React, { useState, useEffect, useLayoutEffect, useContext } from "react";
import "../styles/background.scss";

import { useStoreContext } from "../utils/GlobalState";
import { FOUND_USER, LOADING, UPDATE_FAVORITES, UPDATE_LANGUAGES, UPDATE_LOCALUSERNAME, UPDATE_LOCATION } from '../utils/actions';

import { githubAuth, checkLocalStorageHome, getFavoriteRecursion, googleAuth } from '../functions/functions';

import { useHistory } from 'react-router-dom';
import API from '../utils/API';
import axios from 'axios';

import Landing from './Landing';
import Dashboard from './Dashboard';

function Home () {
  const [offsetY, setOffsetY] = useState(0);
  const handleScroll = () => setOffsetY(window.pageYOffset);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [state, dispatch] = useStoreContext();

  const history = useHistory();


  async function checkDatabase(axios, dispatch, history, API, state) {
    await checkLocalStorageHome(axios, dispatch);
    let { data }  = await API.getUser();
    console.log('this is the data ', data);
    
    if(data.auth === 'github') {
      dispatch({
        type: UPDATE_LOCALUSERNAME,
        username: data.user.username
      })
      githubAuth(data, dispatch, API, state, getFavoriteRecursion, history)
    }
    else if(data.auth === 'google') {
      dispatch({
        type: UPDATE_LOCALUSERNAME,
        username: data.user.displayName
      });
      googleAuth(data, dispatch, API, state, getFavoriteRecursion, history)
    }
    else if (data.auth === 'local') {
      dispatch({
        type: UPDATE_LOCALUSERNAME,
        username: data.user.username
      })
      let localData = await API.getUserInfo(data.user.username)
      if(localData.data[0].firstTime === true) {
        API.getLocalUserUpdate(state.user.username, {firstTime: false})
          .then(() => {
            dispatch({
              type: FOUND_USER,
              user: data.user
            });
            history.push('/newuser');
          })
      }
      else{
        if(localData.data[0].github !== undefined) {
          dispatch({
            type: FOUND_USER,
            user: localData.data[0].github
          })
        }
        else{
          dispatch({
            type: FOUND_USER,
            user: data.user
          })
        }
        dispatch({
          type: UPDATE_LOCATION,
          location: localData.data[0].location
        })
        dispatch({
          type: UPDATE_LANGUAGES,
          languages: localData.data[0].languages
        })
        getFavoriteRecursion(localData.data[0].favorites,[], API, favoriteList =>{
          dispatch({ type: UPDATE_FAVORITES, items: favoriteList});
        });
      }
    }
  }
    
  useEffect(() => {
    if(!state.logged) {
      dispatch({
        type: LOADING
      })
      checkDatabase(axios, dispatch, history, API, state)
    }


  }, [state.logged, state.auth]);

  if(state.logged) return <Dashboard/>
  else return <Landing/>
 
  
}

export default Home;