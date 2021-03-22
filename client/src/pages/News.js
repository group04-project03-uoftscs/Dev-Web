
import React, {useLayoutEffect, useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';

import "../styles/background.scss";

import Card from '../components/Card';

import { useStoreContext } from "../utils/GlobalState";

import { FOUND_USER, LOADED, LOADING } from '../utils/actions';

import { githubAuth, checkLocalStorageHome } from '../functions/functions';

import API from '../utils/API';
import axios from 'axios';

function News () {

  const [state, dispatch] = useStoreContext();
  console.log(state.worldNews);
  const history = useHistory();

  useLayoutEffect(() => {
    if(state.logged) {
      return;
    } else {
      checkLocalStorageHome(axios, dispatch)
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

  const [offsetY, setOffsetY] = useState(0);
  const handleScroll = () => setOffsetY(window.pageYOffset);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const renderContent = () => (
    <div>
    News
      <div className="my-14 flex flex-row flex-wrap mx-auto">
      
      {state.worldNews.length!==0 ?  state.worldNews.map((article) => {
        return (
          <Card article={article} key={article.id}/>
        )
      })
      : 
      <div>Loading</div>
      }
      </div>
    </div>
  );

  return(
    <div>
      <section className="Parallax">
        <div
          className="Parallax__background"
          style={{ transform: `translateY(-${offsetY * 0.5}px)` }}
        />
        <div
          className="Parallax__background-triangles"
          style={{ transform: `translateY(${offsetY * 1.0}px)` }}
        />
        <div className="Parallax__content">{renderContent()}</div>
      </section>
    </div>
  )
}

export default News;
