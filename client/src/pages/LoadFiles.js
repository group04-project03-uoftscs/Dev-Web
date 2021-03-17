import React, { useEffect } from 'react';
import API from '../utils/API';
import Moment from 'moment';

import { useStoreContext } from "../utils/GlobalState";
import { UPDATE_TECHNEWS, UPDATE_FAVORITES, UPDATE_USER, UPDATE_JOBS, UPDATE_CODEWARS } from "../utils/actions";

//This file does not render any components. It requests of the api calls to get the information.
function LoadFiles () {
  const today = Moment().format("YYYY-MM-DD")
  const [state, dispatch] = useStoreContext();
  
  useEffect(() => {
    console.log('loading files');
    getUser("username"); // We need to get the user that is logged in here. I added the name directly here for testing purpose
    
    getCode();

    checkLocalStorage(UPDATE_TECHNEWS, "news", getNews)
    checkLocalStorage(UPDATE_JOBS, "jobs", getJobs)

  }, []);

  const checkLocalStorage = (action, type, api) => {
    if(localStorage.getItem(type)){
      if(JSON.parse(localStorage.getItem(type)).date !== today) {
        api();
      }
      else{
        
        console.log(type + ' already there')
        dispatch({ type: action, items: JSON.parse(localStorage.getItem(type)).items})
      }
    }
    else{
      api();
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

  const getNews = () => {
    console.log('getting news')
    API.getTechNews()
      .then(result => {
        dispatch({ type: UPDATE_TECHNEWS, items: result.data})
      
      localStorage.setItem('news',JSON.stringify({
        date: today,
        items: result.data
      }))
    })
    .catch(err =>{
      console.log(err)
    });
  }

  const getJobs = () => {
    console.log('getting jobs')
    API.getJobs()
      .then(result => {
        dispatch({ type: UPDATE_JOBS, items: result.data})
      
      localStorage.setItem('jobs',JSON.stringify({
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