import React, { useState, useEffect } from "react";
import { Parallax, ParallaxLayer } from 'react-spring/renderprops-addons'
import Card from '../components/Card';
import ListenNotesLogo from "./listen_notes_logo.png";

import { useStoreContext } from "../utils/GlobalState";
import Loading from '../components/Loading'

function Podcast() {
  
  const [state, dispatch] = useStoreContext();

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
                <Loading>Loading podcasts...</Loading>}
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
                <Loading>Loading podcasts...</Loading>}
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
        <ParallaxLayer factor={1} offset={2} className="bg-gradient-to-br from-indigo-300 via-indigo-500 to-blue-800" />
        <ParallaxLayer factor={1} offset={3} className="bg-gradient-to-tr from-indigo-300 via-indigo-500 to-blue-800" />
        <ParallaxLayer factor={1} offset={4} className="bg-gradient-to-br from-indigo-300 via-indigo-500 to-blue-800" />
        <ParallaxLayer factor={1} offset={5} className="bg-gradient-to-tr from-indigo-300 via-indigo-500 to-blue-800" />
        <ParallaxLayer factor={1} offset={6} className="bg-gradient-to-br from-indigo-300 via-indigo-500 to-blue-800" />
        <ParallaxLayer factor={1} offset={7} className="bg-gradient-to-tr from-indigo-300 via-indigo-500 to-blue-800" />
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
              <div className="flex flex-col items-center justify-between">
                <div className="flex-row mx-auto pt-10 p-4">
                  <button className="logo cursor-pointer hover:bg-indigo-200 px-1 py-1 text-lg focus:bg-indigo-700 focus:text-white font-semibold text-gray-700 focus:outline-none border-r-2 border-indigo-200" onClick={() => setFlag(false)}>
                    Best Episodes
                  </button>
                  <button className="logo cursor-pointer hover:bg-indigo-200 px-1 py-1 text-lg focus:bg-indigo-700 focus:text-white font-semibold text-gray-700 focus:outline-none border-l-2 border-indigo-200" onClick={() => setFlag(true)}>
                    Featured Episodes 
                  </button>
                {flag ? <Addroom a={flag} /> : <HomePage h={flag} />}
               </div>
              </div>
          <img src={ListenNotesLogo} style={{ width:"350px", marginBottom:"50px" }} alt="Listen Notes API logo"/>
        </div>
      </div>
    </div>
    </div>
    </Parallax>
  )
}
  
export default Podcast;
