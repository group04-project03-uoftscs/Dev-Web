import React, { useEffect } from 'react';
import API from '../utils/API';
import Moment from 'moment';
import { useStoreContext } from "../utils/GlobalState";
import { UPDATE_TECHNEWS, UPDATE_WORLDNEWS, UPDATE_EPISODES, UPDATE_PODCASTS, UPDATE_CODEWARS } from "../utils/actions";

//This file does not render any components. It requests of the api calls to get the information.
function LoadFiles () {
  const today = Moment().format("YYYY-MM-DD")
  const [state, dispatch] = useStoreContext();
  
  useEffect(() => {
    if(state.logged) {
      getCode();

      if(localStorage.getItem('episodes') === null) localStorage.setItem('episodes', JSON.stringify([]))
      if(localStorage.getItem('podcasts') === null) localStorage.setItem('podcasts', JSON.stringify([]))
      checkLocalStorage(UPDATE_TECHNEWS, "technews", API.getTechNews)
      checkLocalStorage(UPDATE_WORLDNEWS, "worldnews", API.getWorldNews)
      checkLocalStorage(UPDATE_EPISODES, "recentEpisodes", API.getLatestEpisodes)
      checkLocalStorage(UPDATE_PODCASTS, "bestPodcasts", API.getBestPodcasts)
    }
    else {
      return;
    }
    

  }, [state.logged]);

  const checkLocalStorage = (action, type, api) => {
    if(localStorage.getItem(type)){
      if(JSON.parse(localStorage.getItem(type)).date === today) {
        return dispatch({ type: action, items: JSON.parse(localStorage.getItem(type)).items})
      }
    }
    getItems(action, type, api);
  }
  

  const getCode = () => {
    API.getCodeWars()
      .then(result =>{
        const codewars = result.data;
        let description = codewars.description;
        codewars["formatDescription"] = description.split("```");
        dispatch({ type: UPDATE_CODEWARS, code:codewars});
      })
      .catch(err =>{
        console.log(err)
      });
  }

  const getItems = (action, type, api) =>{
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