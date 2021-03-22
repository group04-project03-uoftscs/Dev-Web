import React, { useLayoutEffect } from "react";
import Card from '../components/Card';

import { useStoreContext } from "../utils/GlobalState";

import { FOUND_USER, LOADED, LOADING } from '../utils/actions';

import { githubAuth } from '../functions/functions';

import { useHistory } from 'react-router-dom';
import API from '../utils/API';

function Podcast() {

  const history = useHistory();
  
  const [state, dispatch] = useStoreContext();

  useLayoutEffect(() => {
    if(state.logged) {
      return;
    } else {
      API.getUser()
      .then(({data}) => {
        console.log(data);
        if(data.auth === 'github') {
          githubAuth(data, dispatch, API, state)
        } else if (data.auth === 'local') {
          dispatch({
            type: FOUND_USER,
            user: {...data.user}
          })
        } else {
          history.push('/landing')
        }
      })
    }
  }, []);

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
