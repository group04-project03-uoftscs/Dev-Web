
import React, { useState, useEffect} from 'react';
import { Parallax, ParallaxLayer } from 'react-spring/renderprops-addons'
import Loading from '../components/Loading'
import Card from '../components/Card';

import { useStoreContext } from "../utils/GlobalState";

function News () {

  const [state, dispatch] = useStoreContext();

  function Addroom() {
  return (
    <div>
       {/* Tech News */}
       {console.log("tech news")}
      <div>
        <div className="flex flex-row flex-wrap mx-auto">
  
          {state.techNews.length!==0 ?  state.techNews.map((article, index) => {
          return (
          <Card article={article} key={index}/>
          )}):  
          <Loading>Loading news articles...</Loading>}
              
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
            <div className="flex flex-row flex-wrap mx-auto">
      
              {state.worldNews.length!==0 ?  state.worldNews.map((article, index) => {
              return (
              <Card article={article} key={index}/>
              )}): 
              <Loading>Loading news articles...</Loading>}
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
        <ParallaxLayer factor={1} offset={8} className="bg-gradient-to-br from-indigo-300 via-indigo-500 to-blue-800" />
        <ParallaxLayer factor={1} offset={9} className="bg-gradient-to-tr from-indigo-300 via-indigo-500 to-blue-800" />
        <ParallaxLayer factor={1} offset={10} className="bg-gradient-to-br from-indigo-300 via-indigo-500 to-blue-800" />
        <ParallaxLayer factor={1} offset={11} className="bg-gradient-to-tr from-indigo-300 via-indigo-500 to-blue-800" />
        <ParallaxLayer factor={1} offset={12} className="bg-gradient-to-br from-indigo-300 via-indigo-500 to-blue-800" />
        <ParallaxLayer factor={1} offset={13} className="bg-gradient-to-tr from-indigo-300 via-indigo-500 to-blue-800" />
        <ParallaxLayer factor={1} offset={14} className="bg-gradient-to-br from-indigo-300 via-indigo-500 to-blue-800" />
        <ParallaxLayer factor={1} offset={15} className="bg-gradient-to-tr from-indigo-300 via-indigo-500 to-blue-800" />
        <ParallaxLayer factor={1} offset={16} className="bg-gradient-to-br from-indigo-300 via-indigo-500 to-blue-800" />
        <ParallaxLayer factor={1} offset={17} className="bg-gradient-to-tr from-indigo-300 via-indigo-500 to-blue-800" />
        <ParallaxLayer factor={1} offset={18} className="bg-gradient-to-br from-indigo-300 via-indigo-500 to-blue-800" />
        <ParallaxLayer factor={1} offset={19} className="bg-gradient-to-tr from-indigo-300 via-indigo-500 to-blue-800" />
        <ParallaxLayer factor={1} offset={20} className="bg-gradient-to-br from-indigo-300 via-indigo-500 to-blue-800" />
        <ParallaxLayer factor={1} offset={21} className="bg-gradient-to-tr from-indigo-300 via-indigo-500 to-blue-800" />
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
                  <button className="cursor-pointer hover:bg-indigo-200 px-1 py-1 text-xl focus:bg-indigo-700 focus:text-white font-semibold text-gray-700 focus:outline-none border-r-2 border-indigo-200" onClick={() => setFlag(false)}>
                    World News
                  </button>
                  <button className="cursor-pointer hover:bg-indigo-200 px-1 py-1 text-xl focus:bg-indigo-700 focus:text-white font-semibold text-gray-700 focus:outline-none border-l-2 border-indigo-200" onClick={() => setFlag(true)}>
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
