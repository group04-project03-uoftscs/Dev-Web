import React, { useLayoutEffect } from "react";
import Card from '../components/Card';

import { useStoreContext } from "../utils/GlobalState";

import { FOUND_USER, LOADED, LOADING } from '../utils/actions';

import { useHistory } from 'react-router-dom';
import API from '../utils/API';

function Podcast() {

  const history = useHistory();
  
  const [state, dispatch] = useStoreContext();

  useLayoutEffect(() => {
    dispatch({
      type: LOADING
    })
    async function getUser() {
      const {data} = await API.getUser();
      console.log(data.hasOwnProperty('user'))
      if(data.hasOwnProperty('user')) {
        dispatch({
          type: FOUND_USER,
          user: data.user
        });
        console.log('logged: ' + state.logged)
      } else if(!data.hasOwnProperty('user')) {
        dispatch({
          type: LOADED
        })
        history.push('/login')
      }
    }
    getUser();
  }, [state.logged]);

  return(
    <div className="my-14">
      Podcasts
      {state.bestPodcasts.length!==0 ?  state.bestPodcasts.map((article) => {
        return (
          <Card article={article} key={article.id}/>
        )
      })
      : 
      <div>Loading</div>
    }
    
    Episodes
      {state.recentEpisodes.length!==0 ?  state.recentEpisodes.map((article) => {
        return (
          <Card article={article} key={article.id}/>
        )
      })
      : 
      <div>Loading</div>
    }
    </div>
  )
}

export default Podcast;
