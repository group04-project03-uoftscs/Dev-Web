import React, { useLayoutEffect, useContext } from 'react';
import Card from '../components/Card'

import { useStoreContext } from "../utils/GlobalState";

import { FOUND_USER, LOADED, LOADING } from '../utils/actions';

import { useHistory } from 'react-router-dom';
import API from '../utils/API';

function Home () {
  const [state, dispatch] = useStoreContext();
  console.log(state);
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
      Home page
      {console.log(state.user)}
      { (Object.keys(state.user).length !== 0 && Object.keys(state.codewars).length !== 0) ? 
        <div>
          User: {state.user.username}
          <br />
          Code: {state.codewars.name}
        </div>
        :
        <div> 
          Loading user account info
        </div>
      }

      <div>
        {state.favorites.length!==0 ?  state.favorites.map((article) => {
          return (
            <Card article={article} key={article.id}/>
          )
        })
        : 
        <div>No Bookmarks</div>
      }
      </div>
      

    </div>
  )
}

export default Home;