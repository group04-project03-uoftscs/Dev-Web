import React, { useState, useEffect, useLayoutEffect, useContext } from "react";
import "../styles/background.scss";

import Card from '../components/Card'

import { useStoreContext } from "../utils/GlobalState";

import { AUTH_METHOD, FOUND_USER, LOADED, LOADING, UPDATE_FAVORITES, UPDATE_LOCATION } from '../utils/actions';

import { useHistory } from 'react-router-dom';
import API from '../utils/API';

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

  console.log(state);
  const history = useHistory();

  useLayoutEffect(() => {
    dispatch({
      type: LOADING
    })
    async function getUser() {
      const {data} = await API.getUser();
      console.log(data);
      console.log(data.hasOwnProperty('user'))
      if(data.hasOwnProperty('user')) {
        const userData = data.user
        console.log(userData);
        dispatch({
          type: AUTH_METHOD,
          auth: data.auth
        })
        dispatch({
          type: FOUND_USER,
          user: userData
        });
        API.findGithubUser(userData.id)
        .then(githubData=> {
          console.log(githubData.data.length)
          if(!githubData.data.length){
            let newGithubUserData = {
              username: userData.username,
              github: userData._json,
              auth: 'github',
              location: userData._json.location,
              languages: '',
              favorites: []
            }
            dispatch({
              type: UPDATE_LOCATION,
              location: userData._json.location
            })
            API.addGithubUser(newGithubUserData)
            .then(() => {
              history.push('/newuser')
            }) 
          } else {
            console.log(githubData.data[0].location)
            dispatch({
              type: UPDATE_LOCATION,
              location: githubData.data[0].location
            })
            getFavoriteRecursion(githubData.data[0].favorites,[], favoriteList =>{
          
              console.log(favoriteList)
              dispatch({ type: UPDATE_FAVORITES, items: favoriteList});
            });
          }
        })
      } else if(!data.hasOwnProperty('user')) {
        dispatch({
          type: LOADED
        })
        // history.push('/landing')
      }
    }
    getUser();
  }, [state.logged]);

  console.log(state)

  const getFavoriteRecursion = (databaseList, favoriteList, cb) => {
    console.log(databaseList)
    console.log(favoriteList)
    if(databaseList.length === favoriteList.length) cb(favoriteList);
    else{
      let fave = databaseList[favoriteList.length];
      if(fave.type === "episodes" || fave.type === "podcasts") {
        let localItems = JSON.parse(localStorage.getItem(fave.type));
        let found = localItems.filter(item => item.id === fave.id);
        if(found.length === 1) {
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

  console.log(state)

  if(state.logged) return <Dashboard/>
  else return <Landing/>
 
  
}

export default Home;