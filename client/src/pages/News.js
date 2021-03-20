import React, {useLayoutEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';
import Card from '../components/Card';

import { useStoreContext } from "../utils/GlobalState";

import { FOUND_USER, LOADED, LOADING } from '../utils/actions';

import API from '../utils/API';

function News () {

  const [state, dispatch] = useStoreContext();
  console.log(state.worldNews);
  const history = useHistory();

  useLayoutEffect(() => {
    dispatch({
      type: LOADING
    })
    async function getUser() {
      const data = await API.getUser();
      console.log(data.data)
      console.log(data.data.hasOwnProperty('id'))
      if(data.data.hasOwnProperty('id') || data.data.hasOwnProperty('_id')) {
        dispatch({
          type: FOUND_USER,
          user: data.data
        });
        console.log('logged: ' + state.logged)
      } else if(!data.data.hasOwnProperty('id') || !data.data.hasOwnProperty('_id')) {
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
      News
      {state.worldNews.length!==0 ?  state.worldNews.map((article) => {
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

export default News;