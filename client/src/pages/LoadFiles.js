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
    // getUser("test"); // We need to get the user that is logged in here. I added the name directly here for testing purpose
    if(state.logged) {
      console.log('loading files');
      getCode();

      if(localStorage.getItem('episodes') === null) localStorage.setItem('episodes', JSON.stringify([]))
      if(localStorage.getItem('podcasts') === null) localStorage.setItem('podcasts', JSON.stringify([]))
      checkLocalStorage(UPDATE_TECHNEWS, "technews", API.getTechNews)
      checkLocalStorage(UPDATE_WORLDNEWS, "worldnews", API.getWorldNews)
      checkLocalStorage(UPDATE_EPISODES, "recentEpisodes", API.getLatestEpisodes)
      checkLocalStorage(UPDATE_PODCASTS, "bestPodcasts", API.getBestPodcasts)
    }
    else {
      console.log('not logged in')
      return;
    }
    

  }, [state.logged]);

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

  const getFavoriteRecursion = (databaseList, favoriteList, cb) => {
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

  const getCode = () => {
    API.getCodeWars()
      .then(result =>{
        const codewars = result.data;
        let description = codewars.description;
        codewars["formatDescription"] = description.split("```");
        dispatch({ type: UPDATE_CODEWARS, code:codewars});
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