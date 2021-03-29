
import React, { useState, useEffect} from 'react';
import { Parallax, ParallaxLayer } from 'react-spring/renderprops-addons'
import Loading from '../components/Loading'
import Card from '../components/Card';
import useDarkMode from '../functions/useDarkMode';

import { useStoreContext } from "../utils/GlobalState";

function News () {

  const [state, dispatch] = useStoreContext();

  function Addroom() {
  return (
    <div>
       {/* Tech News */}
       {console.log("tech news")}
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
function HomePage() {
  return (
    <div>
      {/* World News */}
       {console.log("world news")}
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

      {console.log("news")}
      <div className="relative w-full h-full">
        <div className="px-6 py-8">
          <div className="flex justify-between container mx-auto">
            <div className="w-full">
                {/* Header */}
              <div className="flex flex-col items-center justify-between">
                <div className="flex-row mx-auto pt-10 p-4">
                  <button className="logo cursor-pointer hover:bg-indigo-200 px-1 py-1 text-xl focus:bg-indigo-700 focus:text-white font-semibold text-gray-700 focus:outline-none border-r-2 border-indigo-200 dark:text-white transition duration-500" onClick={() => setFlag(false)}>
                    World News
                  </button>
                  <button className="logo cursor-pointer hover:bg-indigo-200 px-1 py-1 text-xl focus:bg-indigo-700 focus:text-white font-semibold text-gray-700 focus:outline-none border-l-2 border-indigo-200 dark:text-white transition duration-500" onClick={() => setFlag(true)}>
                    Tech News 
                  </button>
                {flag ? <Addroom /> : <HomePage />}
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
