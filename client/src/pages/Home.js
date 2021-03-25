import React, { useState, useEffect, useLayoutEffect, useContext } from "react";
import "../styles/background.scss";

import Card from '../components/Card'

import { useStoreContext } from "../utils/GlobalState";

import { AUTH_METHOD, FOUND_USER, LOADED, LOADING, UPDATE_FAVORITES, UPDATE_LANGUAGES, UPDATE_LOCALUSERNAME, UPDATE_LOCATION } from '../utils/actions';

import { githubAuth, checkLocalStorageHome, getFavoriteRecursion } from '../functions/functions';

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
    console.log(data);
    
    if(data.auth === 'github') {
      dispatch({
        type: UPDATE_LOCALUSERNAME,
        username: data.user.username
      })
        githubAuth(data, dispatch, API, state, getFavoriteRecursion, history)
        } else if (data.auth === 'local') {

      await githubAuth(data, dispatch, API, state, getFavoriteRecursion, history)
    } else if (data.auth === 'local') {
      dispatch({
        type: UPDATE_LOCALUSERNAME,
        username: data.user.username
      })
      let localData = await API.getUserInfo(data.user.username)
      console.log(localData);
      if(localData.data[0].firstTime === true) {
        console.log('yes');
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
        if(Object.keys(localData.data[0].github).length !== 0) {
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
        getFavoriteRecursion(localData.data[0].favorites,[], favoriteList =>{
          
          console.log(favoriteList)
          dispatch({ type: UPDATE_FAVORITES, items: favoriteList});
        });
      }
    }
  }
    
  useEffect(() => {
    console.log(state)
    if(!state.logged) {
      
    console.log('back home');
      dispatch({
        type: LOADING
      })
      checkDatabase(axios, dispatch, history, API, state)
    }


  }, [state.logged, state.auth]);


  // const getFavoriteRecursion = (databaseList, favoriteList, cb) => {
  //   console.log(databaseList)
  //   console.log(favoriteList)
  //   if(databaseList.length === favoriteList.length) cb(favoriteList);
  //   else{
  //     let fave = databaseList[favoriteList.length];
  //     if(fave.type === "episodes" || fave.type === "podcasts") {
  //       console.log('getting episode and podcast')
  //       let localItems = JSON.parse(localStorage.getItem(fave.type));
  //       let found = localItems.filter(item => item.id === fave.id);
  //       console.log(found)
  //       if(found.length >= 1) {
  //         favoriteList.push(found[0]);
  //         getFavoriteRecursion(databaseList,favoriteList,cb)
  //       }
  //       else {
  //         if(fave.type === "episodes"){
  //           API.getEpisode(fave.id)
  //             .then(result => {

  //               let saved = JSON.parse(localStorage.getItem(fave.type));
  //               saved.push(result.data);
  //               localStorage.setItem(fave.type, JSON.stringify(saved));
                
  //               favoriteList.push(result.data);
  //               getFavoriteRecursion(databaseList,favoriteList,cb);
  //             })
  //             .catch(err =>{
  //               console.log(err);
  //               favoriteList.push(fave);
  //               getFavoriteRecursion(databaseList,favoriteList,cb);
  //             })
  //         }
  //         else if(fave.type === "podcasts"){
  //           API.getPodcast(fave.id)
  //             .then(result => {
  //               console.log(result.data)

  //               let saved = JSON.parse(localStorage.getItem(fave.type));
  //               saved.push(result.data);
  //               localStorage.setItem(fave.type, JSON.stringify(saved));
                
  //               favoriteList.push(result.data);
  //               getFavoriteRecursion(databaseList,favoriteList,cb);
  //             })
  //             .catch(err =>{
  //               console.log(err);
  //               favoriteList.push(fave);
  //               getFavoriteRecursion(databaseList,favoriteList,cb);
  //             })
  //         }
  //       }
  //     }
  //     else {
  //       favoriteList.push(fave);
  //       getFavoriteRecursion(databaseList,favoriteList,cb);
  //     }
  //   }
  // }

  if(state.logged) return <Dashboard/>
  else return <Landing/>
 
  
}

export default Home;