import React, { useLayoutEffect, useState, useEffect } from "react";
import { Parallax, ParallaxLayer } from 'react-spring/renderprops-addons'
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

  function Addroom(props) {
  return (
    <div>
       {/* Best Podcast */}
            <div>
              <div className="flex flex-row flex-wrap mx-auto">
        
                {state.bestPodcasts.length!==0 ?  state.bestPodcasts.map((article) => {
                return (
                <Card article={article} key={article.id}/>
                )}): 
                <div>Loading</div>}
              </div>
            </div>
          </div>
  );
}
function HomePage(props) {
  return (
    <div>
                  {/* Recent Podcast */}
            <div>
              <div className="flex flex-row flex-wrap mx-auto">
        
                {state.recentEpisodes.length!==0 ?  state.recentEpisodes.map((article) => {
                return (
                <Card article={article} key={article.id}/>
                )}): 
                <div>Loading</div>}
              </div>
            </div>
            
          </div>
  );
}

  const [offsetY, setOffsetY] = useState(0);
  const handleScroll = () => setOffsetY(window.pageYOffset);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const url = (name, wrap = false) => `${wrap ? 'url(' : ''}https://awv3node-homepage.surge.sh/build/assets/${name}.svg${wrap ? ')' : ''}`
  const [flag, setFlag] = useState(false);


  return(
    <Parallax>
      <ParallaxLayer factor={1} offset={0} className="bg-gradient-to-br from-yellow-300 via-indigo-500 to-blue-800" />
        <ParallaxLayer factor={1} offset={1} className="bg-gradient-to-tr from-indigo-300 via-indigo-500 to-blue-800" />
        <ParallaxLayer factor={1} offset={2} className="bg-gradient-to-tr from-indigo-300 via-indigo-500 to-blue-800" />
        <ParallaxLayer factor={1} offset={3} className="bg-gradient-to-tr from-indigo-300 via-indigo-500 to-blue-800" />
        <ParallaxLayer factor={1} offset={4} className="bg-gradient-to-tr from-indigo-300 via-indigo-500 to-blue-800" />
        <ParallaxLayer factor={1} offset={5} className="bg-gradient-to-tr from-indigo-300 via-indigo-500 to-blue-800" />
        <ParallaxLayer style={{ backgroundImage: url('stars', true), backgroundSize: 'cover' }} />
        <ParallaxLayer offset={1} style={{ backgroundImage: url('stars', true)}} />
        <ParallaxLayer style={{ opacity: 0.2 }}>
          <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '60%' }} />
          <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '5%' }} />
          <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '80%' }} />
          <img src={url('cloud')} style={{ display: 'block', width: '10%', marginLeft: '10%' }} />
          <img src={url('cloud')} style={{ display: 'block', width: '10%', marginLeft: '60%' }} />
          <img src={url('cloud')} style={{ display: 'block', width: '10%', marginLeft: '30%' }} />
      </ParallaxLayer>

    <div className="relative w-full h-full">
      <div className="px-6 py-10">
        <div className="flex justify-between container mx-auto">
          <div className="w-full">
              {/* Header */}
              <div className="flex flex-col pb-20 items-center justify-between">
                <div className="flex-row mx-auto pt-10">
                  <button className="flex mx-auto text-xl p-4 font-bold text-gray-700 focus:outline-none" onClick={() => setFlag(!flag)}>
                    Best Episodes  |  Featured Episodes
                  </button>
                {flag ? <Addroom a={flag} /> : <HomePage h={flag} />}
               </div>
              </div>
          
        </div>
      </div>
    </div>
    </div>
    </Parallax>
  )
}
  
export default Podcast;
