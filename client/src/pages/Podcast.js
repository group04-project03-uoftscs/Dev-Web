import React, { useState, useEffect } from "react";
import { Parallax, ParallaxLayer } from 'react-spring/renderprops-addons'
import Card from '../components/Card';
import ListenNotesLogo from "./listen_notes_logo.png";
import useDarkMode from './useDarkMode'

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
                <Loading className="mt-4">Loading podcasts...</Loading>}
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
      <useDarkMode />
      <ParallaxLayer factor={1} offset={0} className="dark:bg-black dark:text-white transition duration-500" />
        <ParallaxLayer factor={1} offset={1} className="dark:bg-black dark:text-white transition duration-500" />
        <ParallaxLayer factor={1} offset={2} className="dark:bg-black dark:text-white transition duration-500" />
        <ParallaxLayer factor={1} offset={3} className="dark:bg-black dark:text-white transition duration-500" />
        <ParallaxLayer factor={1} offset={4} className="dark:bg-black dark:text-white transition duration-500" />
        <ParallaxLayer factor={1} offset={5} className="dark:bg-black dark:text-white transition duration-500" />
        <ParallaxLayer factor={1} offset={6} className="dark:bg-black dark:text-white transition duration-500" />
        <ParallaxLayer factor={1} offset={7} className="dark:bg-black dark:text-white transition duration-500" />
        <ParallaxLayer offset={0} speed={0}>
          <img className="cover hidden md:block md:w-full md:h-full opacity-20" src="https://i.postimg.cc/1XydR6bn/bg-2.png" alt="Binary code background image"></img>
        </ParallaxLayer>
        <ParallaxLayer offset={1} speed={1}>
          <img className="cover hidden md:block md:w-full md:h-full opacity-20" src="https://i.postimg.cc/1XydR6bn/bg-2.png" alt="Binary code background image"></img>
        </ParallaxLayer>
        <ParallaxLayer offset={2} speed={1}>
          <img className="cover hidden md:block md:w-full md:h-full opacity-20" src="https://i.postimg.cc/1XydR6bn/bg-2.png" alt="Binary code background image"></img>
        </ParallaxLayer>
        <ParallaxLayer style={{ opacity: 0.2 }}>
          <svg style={{ display: 'block', width: '20%', marginLeft: '60%' }} fill="none" stroke="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path></svg>
          <svg style={{ display: 'block', width: '20%', marginLeft: '5%' }} fill="none" stroke="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path></svg>
          <svg style={{ display: 'block', width: '20%', marginLeft: '80%' }} fill="none" stroke="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path></svg>
          <svg style={{ display: 'block', width: '10%', marginLeft: '10%' }} fill="none" stroke="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path></svg>
          <svg style={{ display: 'block', width: '10%', marginLeft: '60%' }} fill="none" stroke="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path></svg>
          <svg style={{ display: 'block', width: '10%', marginLeft: '30%' }} fill="none" stroke="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path></svg>
      </ParallaxLayer>

    <div className="relative w-full h-full">
      <div className="px-6 py-10">
        <div className="flex justify-between container mx-auto">
          <div className="w-full">
              {/* Header */}
              <div className="flex flex-col items-center justify-between">
                <div className="flex-row mx-auto pt-10 p-4">
                  <button className="logo cursor-pointer hover:bg-indigo-200 px-1 py-1 text-lg focus:bg-indigo-700 focus:text-white font-semibold text-black focus:outline-none border-r-2 border-indigo-200 dark:text-white transition duration-500" onClick={() => setFlag(false)}>
                    Best Episodes
                  </button>
                  <button className="logo cursor-pointer hover:bg-indigo-200 px-1 py-1 text-lg focus:bg-indigo-700 focus:text-white font-semibold text-black focus:outline-none border-l-2 border-indigo-200 dark:text-white transition duration-500" onClick={() => setFlag(true)}>
                    Featured Episodes 
                  </button>
                {flag ? <Addroom a={flag} /> : <HomePage h={flag} />}
               </div>
              </div>
          <img className="responsive" src={ListenNotesLogo} style={{ width:"350px", marginBottom:"50px" }} alt="Listen Notes API logo"/>
        </div>
      </div>
    </div>
    </div>
    </Parallax>
  )
}
  
export default Podcast;
