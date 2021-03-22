
import React, {useLayoutEffect, useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';

import "../styles/background.scss";

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

  const [offsetY, setOffsetY] = useState(0);
  const handleScroll = () => setOffsetY(window.pageYOffset);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const renderContent = () => (
    <div className="px-6 py-8">
      <div className="flex justify-between container mx-auto">
        <div className="w-full lg:w-8/12">
            {/* Header */}
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-700 md:text-2xl">Tech News</h1>
          </div>
            {/* Tech News Card */}
          <div>
            <div className="my-14 flex flex-row flex-wrap mx-auto">
      
              {state.techNews.length!==0 ?  state.techNews.map((article) => {
              return (
              <Card article={article} key={article.id}/>
              )}): 
              <div>Loading</div>}
            </div>
          </div>
         </div>

        <div className="lg: w-4/12">
              {/* Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-700 md:text-2xl">World News</h2>
          </div>

                {/* World News */}
          <div>
            <div className="my-14 flex flex-row flex-wrap mx-auto">
      
              {state.worldNews.length!==0 ?  state.worldNews.map((article) => {
              return (
              <Card article={article} key={article.id}/>
              )}): 
              <div>Loading</div>}
            </div>
          </div>
          
        </div>
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
