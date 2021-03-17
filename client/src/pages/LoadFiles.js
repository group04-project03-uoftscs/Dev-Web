import React, { useEffect } from 'react';
import API from '../utils/API';
import Moment from 'moment';

import { useStoreContext } from "../utils/GlobalState";
import { 
  UPDATE_TECHNEWS, 
  UPDATE_WORLDNEWS,
  UPDATE_FAVORITES, 
  UPDATE_EPISODES,
  UPDATE_PODCASTS, 
  UPDATE_USER, 
  UPDATE_JOBS, 
  UPDATE_CODEWARS 
} from "../utils/actions";

//This file does not render any components. It requests of the api calls to get the information.
function LoadFiles () {
  const today = Moment().format("YYYY-MM-DD")
  const [state, dispatch] = useStoreContext();
  
  useEffect(() => {
    console.log('loading files');
    getUser("username"); // We need to get the user that is logged in here. I added the name directly here for testing purpose
    
    getCode();

    if(localStorage.getItem('episodes') === null) localStorage.setItem('episodes', JSON.stringify([]))
    if(localStorage.getItem('podcasts') === null) localStorage.setItem('podcasts', JSON.stringify([]))
    checkLocalStorage(UPDATE_TECHNEWS, "technews", API.getTechNews)
    checkLocalStorage(UPDATE_WORLDNEWS, "worldnews", API.getWorldNews)
    checkLocalStorage(UPDATE_EPISODES, "recentEpisodes", API.getLatestEpisodes)
    checkLocalStorage(UPDATE_PODCASTS, "bestPodcasts", API.getBestPodcasts)
    checkLocalStorage(UPDATE_JOBS, "jobs", API.getJobs)

  }, []);

  const checkLocalStorage = (action, type, api) => {
    if(localStorage.getItem(type)){
      if(JSON.parse(localStorage.getItem(type)).date !== today) {
        getItems(action, type, api);
      }
      else{
        
        console.log(type + ' already there')
        dispatch({ type: action, items: JSON.parse(localStorage.getItem(type)).items})
      }
    }
    else{
      getItems(action, type, api);
    }
  }

  const getUser = (user) => {
    API.getUser(user)
      .then(result =>{
        console.log('user')
        console.log(result.data[0])
        dispatch({ type: UPDATE_USER, user: result.data[0]});
        
        dispatch({ type: UPDATE_FAVORITES, items: result.data[0].favorites});
      })
      .catch(err =>{
        console.log(err)
      });
  }

  const getCode = () => {
    API.getCodeWars()
      .then(result =>{
        dispatch({ type: UPDATE_CODEWARS, code: result.data});
        console.log(result.data);
      })
      .catch(err =>{
        console.log(err)
      });
  }

  const getItems = (action, type, api) =>{
    console.log(`getting ${type}`)
    api()
      .then(result => {
        dispatch({ type: action, items: result.data})
      
      localStorage.setItem(type , JSON.stringify({
        date: today,
        items: result.data
      }))
    })
    .catch(err =>{
      console.log(err)
    });
  }

  return(
    <div>
    </div>
  )

}

export default LoadFiles;