import React, { useState, useEffect, useLayoutEffect, useContext } from "react";
import "../styles/background.scss";

import Card from '../components/Card'

import { useStoreContext } from "../utils/GlobalState";

import { AUTH_METHOD, FOUND_USER, LOADED, LOADING, UPDATE_FAVORITES, UPDATE_LOCATION } from '../utils/actions';

import { githubAuth, checkLocalStorageHome } from '../functions/functions';

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


  useEffect(() => {
    if(!state.logged) {
      dispatch({
        type: LOADING
      })
      async function checkDatabase(axios, dispatch, history, API, state) {
      await checkLocalStorageHome(axios, dispatch);
      let { data }  = await API.getUser();
      console.log(data);
      if(data.auth === 'github') {
        await githubAuth(data, dispatch, API, state)
      } else if (data.auth === 'local') {
        let localData = await API.getUserInfo(data.user.username)
        console.log(localData);
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
      }
    }
    checkDatabase(axios, dispatch, history, API, state)
  }

  {/* useLayoutEffect(() => {
    dispatch({
      type: LOADING
    })
    async function checkDatabase(axios, dispatch, history, API, state) {
      await checkLocalStorageHome(axios, dispatch);
      API.getUser()
        .then(({data}) => {
          console.log(data);
          if(data.auth === 'github') {
            githubAuth(data, dispatch, API, state, getFavoriteRecursion, history)
          } else if (data.auth === 'local') {
            dispatch({
              type: FOUND_USER,
              user: data.user
            });
            API.getDatabaseUser(data.user.username)
            .then(localData => {
              console.log(localData.data[0].firstTime);
              if(localData.data[0].firstTime === true) {
                API.getLocalUserUpdate(state.user.username, {firstTime: false})
                .then(() => history.push('/newuser'));
              }
            })
          } else {
            return;
          }
        });
        dispatch({
          type: LOADED
        })
    }
    checkDatabase(axios, dispatch, history, API, state); */}

  }, [state.logged]);


  const getFavoriteRecursion = (databaseList, favoriteList, cb) => {
    console.log(databaseList)
    console.log(favoriteList)
    if(databaseList.length === favoriteList.length) cb(favoriteList);
    else{
      let fave = databaseList[favoriteList.length];
      if(fave.type === "episodes" || fave.type === "podcasts") {
        console.log('getting episode and podcast')
        let localItems = JSON.parse(localStorage.getItem(fave.type));
        let found = localItems.filter(item => item.id === fave.id);
        console.log(found)
        if(found.length >= 1) {
          favoriteList.push(found[0]);
          getFavoriteRecursion(databaseList,favoriteList,cb)
        }
        else {
          if(fave.type === "episodes"){
            API.getEpisode(fave.id)
              .then(result => {

                let saved = JSON.parse(localStorage.getItem(fave.type));
                saved.push(result.data);
                localStorage.setItem(fave.type, JSON.stringify(saved));
                
                favoriteList.push(result.data);
                getFavoriteRecursion(databaseList,favoriteList,cb);
              })
              .catch(err =>{
                console.log(err);
                favoriteList.push(fave);
                getFavoriteRecursion(databaseList,favoriteList,cb);
              })
          }
          else if(fave.type === "podcasts"){
            API.getPodcast(fave.id)
              .then(result => {
                console.log(result.data)

                let saved = JSON.parse(localStorage.getItem(fave.type));
                saved.push(result.data);
                localStorage.setItem(fave.type, JSON.stringify(saved));
                
                favoriteList.push(result.data);
                getFavoriteRecursion(databaseList,favoriteList,cb);
              })
              .catch(err =>{
                console.log(err);
                favoriteList.push(fave);
                getFavoriteRecursion(databaseList,favoriteList,cb);
              })
          }
        }
      }
      else {
        favoriteList.push(fave);
        getFavoriteRecursion(databaseList,favoriteList,cb);
      }
    }
  }

  if(state.logged) return <Dashboard/>
  else return <Landing/>
 
  
}

export default Home;