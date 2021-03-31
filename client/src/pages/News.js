
import React, { useState, useEffect} from 'react';
import { Parallax, ParallaxLayer } from 'react-spring/renderprops-addons'
import Loading from '../components/Loading'
import Card from '../components/Card';
import useDarkMode from './useDarkMode';

import { useStoreContext } from "../utils/GlobalState";

function News () {

  const [state, dispatch] = useStoreContext();

  
  const [temperature, setTemperature] = useState();
  const [weatherIcon, setWeatherIcon] = useState();
  const [weatherDescription, setWeatherDescription] = useState();

  function TechPage() {
  return (
    <div>
       {/* Tech News */}
      <div>
        <div className="flex flex-row flex-wrap mx-auto mb-20">
  
          {state.techNews.length!==0 ?  state.techNews.map((article, index) => {
          return (
          <Card article={article} key={index}/>
          )}):  
          <div className="mt-4">
            <Loading>Loading news articles...</Loading>
          </div>
          }
              
        </div>
      </div>
    </div>
  );
}
function WorldPage() {
  return (
    <div>
      {/* World News */}
          <div>
            <div className="flex flex-row flex-wrap mx-auto mb-20">
      
              {state.worldNews.length!==0 ?  state.worldNews.map((article, index) => {
              return (
              <Card article={article} key={index}/>
              )}): 
              <div className="mt-4">
                <Loading>Loading news articles...</Loading>
              </div>
              }
            </div>
          </div>
    </div>
  );
}

  const [offsetY, setOffsetY] = useState(0);
  const handleScroll = () => setOffsetY(window.pageYOffset);

  
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    API.getWeather(state.location)
      .then(result =>{
        setTemperature(result.data.temp);
        setWeatherIcon(result.data.iconUrl);
        setWeatherDescription(result.data.description)
      })
      .catch(err=> console.log(err))
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const url = (name, wrap = false) => `${wrap ? 'url(' : ''}https://awv3node-homepage.surge.sh/build/assets/${name}.svg${wrap ? ')' : ''}`
  const [flag, setFlag] = useState(true);

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
        <ParallaxLayer factor={1} offset={8} className="dark:bg-black dark:text-white transition duration-500" />
        <ParallaxLayer factor={1} offset={9} className="dark:bg-black dark:text-white transition duration-500" />
        <ParallaxLayer factor={1} offset={10} className="dark:bg-black dark:text-white transition duration-500" />
        <ParallaxLayer factor={1} offset={11} className="dark:bg-black dark:text-white transition duration-500" />
        <ParallaxLayer factor={1} offset={12} className="dark:bg-black dark:text-white transition duration-500" />
        <ParallaxLayer factor={1} offset={13} className="dark:bg-black dark:text-white transition duration-500" />
        <ParallaxLayer factor={1} offset={14} className="dark:bg-black dark:text-white transition duration-500" />
        <ParallaxLayer factor={1} offset={15} className="dark:bg-black dark:text-white transition duration-500" />
        <ParallaxLayer factor={1} offset={16} className="dark:bg-black dark:text-white transition duration-500" />
        <ParallaxLayer factor={1} offset={17} className="dark:bg-black dark:text-white transition duration-500" />
        <ParallaxLayer factor={1} offset={18} className="dark:bg-black dark:text-white transition duration-500" />
        <ParallaxLayer factor={1} offset={19} className="dark:bg-black dark:text-white transition duration-500" />
        <ParallaxLayer factor={1} offset={20} className="dark:bg-black dark:text-white transition duration-500" />
        <ParallaxLayer factor={1} offset={21} className="dark:bg-black dark:text-white transition duration-500" />
        <ParallaxLayer offset={0} speed={0}>
          <img className="cover hidden md:block md:w-full md:h-full opacity-20" src="https://i.postimg.cc/1XydR6bn/bg-2.png"></img>
        </ParallaxLayer>
        <ParallaxLayer offset={1} speed={1}>
          <img className="cover hidden md:block md:w-full md:h-full opacity-20" src="https://i.postimg.cc/1XydR6bn/bg-2.png"></img>
        </ParallaxLayer>
        <ParallaxLayer offset={2} speed={1}>
          <img className="cover hidden md:block md:w-full md:h-full opacity-20" src="https://i.postimg.cc/1XydR6bn/bg-2.png"></img>
        </ParallaxLayer>
        <ParallaxLayer style={{ opacity: 0.2 }}>
          <svg style={{ display: 'block', width: '20%', marginLeft: '60%' }} fill="none" stroke="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path></svg>
          <svg style={{ display: 'block', width: '20%', marginLeft: '5%' }} fill="none" stroke="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path></svg>
          <svg style={{ display: 'block', width: '20%', marginLeft: '80%' }} fill="none" stroke="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path></svg>
          <svg style={{ display: 'block', width: '10%', marginLeft: '10%' }} fill="none" stroke="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path></svg>
          <svg style={{ display: 'block', width: '10%', marginLeft: '60%' }} fill="none" stroke="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path></svg>
          <svg style={{ display: 'block', width: '10%', marginLeft: '30%' }} fill="none" stroke="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path></svg>
      </ParallaxLayer>

      {console.log("news")}
      <div className="relative w-full h-full">
        <div className="px-6 py-8">
          <div className="flex justify-between container mx-auto">
            <div className="w-full">
                {/* Header */}
              <div className="flex flex-col items-center justify-between">
                <div className="flex-row mx-auto pt-10 p-4">
                  <button className="logo cursor-pointer hover:bg-indigo-200 px-1 py-1 text-xl focus:bg-indigo-700 focus:text-white font-semibold text-black focus:outline-none border-r-2 border-indigo-200 dark:text-white transition duration-500" onClick={() => setFlag(true)}>
                    Tech News
                  </button>
                  <button className="logo cursor-pointer hover:bg-indigo-200 px-1 py-1 text-xl focus:bg-indigo-700 focus:text-white font-semibold text-black focus:outline-none border-l-2 border-indigo-200 dark:text-white transition duration-500" onClick={() => setFlag(false)}>
                    World News 
                  </button>
                  { weatherIcon !== undefined ? 
                    <div className="inline">
                      <img src={weatherIcon} alt={weatherDescription} className="inline"/> <span className="text-xl">{temperature} &#8451;</span>
                    </div>
                    :
                    null
                  }
                {flag ? <TechPage /> : <WorldPage />}
               </div>
              </div>
                {/* Tech News Card */}
              
            </div>
            
          </div>
        </div>
      </div>
    </Parallax>
  )
}



export default News;
