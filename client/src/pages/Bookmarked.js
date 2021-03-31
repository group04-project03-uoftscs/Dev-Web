import React, { useState, useEffect } from "react";
import useDarkMode from './useDarkMode';

import Card from '../components/Card'
import JobCard from '../components/JobCard'

import { useStoreContext } from "../utils/GlobalState";
import { Parallax, ParallaxLayer } from 'react-spring/renderprops-addons'

function Bookmarked() {
  const [state, dispatch] = useStoreContext();
  const [offsetY, setOffsetY] = useState(0);
  const handleScroll = () => setOffsetY(window.pageYOffset);

  function News(props) {
  return (
    <div>
       <div className="flex mt-20 flex-row flex-wrap mx-auto">
            {state.favorites.filter(article => article.type === "articles").length!==0 ?  state.favorites.filter(article => article.type === "articles").map((article) => {
                return (
                  <Card article={article} key={article.id}/>
                )
            })
            : 
            <div className="h-screen">
              <div className="flex w-full mx-auto items-center justify-center p-4 bg-white rounded-md shadow-md">
                <span className="text-xl tracking-wider text-gray-500 uppercase">No Bookmarks</span>
              </div>
            </div>
          }
          </div>
    </div>
  );
}
function PodcastPage(props) {
  return (
    <div>
      <div className="flex mt-20 flex-row flex-wrap w-full mx-auto items-center justify-center">
            {state.favorites.filter(article => article.type === "podcasts" || article.type === "episodes").length!==0 ?  state.favorites.filter(article => article.type === "podcasts" || article.type === "episodes").map((article) => {
              return (
                <Card article={article} key={article.id}/>
              )
            })
            : 
            <div className="h-screen">
              <div className="flex w-full mx-auto items-center justify-center p-4 bg-yellow-200 rounded-md shadow-md">
                <span className="text-xl tracking-wider text-gray-500 uppercase">No Bookmarks</span>
              </div>
            </div>
          }
          </div>
    </div>
  );
}
function JobsPage(props) {
  return (
    <div>
      <div className="flex mt-20 flex-row flex-wrap w-full mx-auto items-center justify-center">
            {state.favorites.filter(article => article.type === "jobs").length!==0 ?  state.favorites.filter(article => article.type === "jobs").map((article) => {

            return (
              <JobCard job={article} key={article.id}/>
            )
            })
            : 
            <div className="h-screen">
              <div className="flex w-full mx-auto items-center justify-center p-4 bg-white rounded-md shadow-md">
                <span className="text-xl tracking-wider text-gray-500 uppercase">No Bookmarks</span>
              </div>
            </div>
          }
          </div>
    </div>
  );
}

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
    
  }, []);

  const [flag, setFlag] = useState("News");
  const url = (name, wrap = false) => `${wrap ? 'url(' : ''}https://awv3node-homepage.surge.sh/build/assets/${name}.svg${wrap ? ')' : ''}`

  return(
    <Parallax className="bg-gradient-to-br from-blue-500 via-indigo-600 to-indigo-800 dark:bg-black">
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
      <ParallaxLayer offset={0} speed={0}>
        <img className="object-cover w-full h-full opacity-10" src="https://i.postimg.cc/1XydR6bn/bg-2.png"></img>
      </ParallaxLayer>
      <ParallaxLayer offset={1} speed={1}>
        <img className="object-cover w-full h-full opacity-10" src="https://i.postimg.cc/1XydR6bn/bg-2.png"></img>
      </ParallaxLayer>
      <ParallaxLayer offset={2} speed={1}>
        <img className="object-cover w-full h-full opacity-10" src="https://i.postimg.cc/1XydR6bn/bg-2.png"></img>
      </ParallaxLayer>
      <ParallaxLayer style={{ opacity: 0.2 }}>
        <svg style={{ display: 'block', width: '20%', marginLeft: '60%' }} fill="none" stroke="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path></svg>
          <svg style={{ display: 'block', width: '20%', marginLeft: '5%' }} fill="none" stroke="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path></svg>
          <svg style={{ display: 'block', width: '20%', marginLeft: '80%' }} fill="none" stroke="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path></svg>
          <svg style={{ display: 'block', width: '10%', marginLeft: '10%' }} fill="none" stroke="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path></svg>
          <svg style={{ display: 'block', width: '10%', marginLeft: '60%' }} fill="none" stroke="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path></svg>
          <svg style={{ display: 'block', width: '10%', marginLeft: '30%' }} fill="none" stroke="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path></svg>
      </ParallaxLayer>
      {console.log(state)}

      <div className="relative w-full h-full mb-96">
        <div className="md:px-5 px-1 py-10">
        <div className="flex flex-col justify-between container mx-auto">
          {/* Header */}
          <div className="p-5 w-full md:w-1/2 mx-auto items-center justify-center text-white bg-indigo-400 rounded-md shadow-md">
                <div className="flex items-center justify-center">
                  <span className="text-3xl font-semibold tracking-wider uppercase">My Bookmarks</span>
                </div>
          </div>

           <div className="w-full">
              <div className="w-full">
                <div className="flex-row mx-auto pt-10 p-4">
                  <button className="logo cursor-pointer hover:bg-indigo-200 px-1 py-1 text-xl focus:bg-indigo-700 focus:text-white font-semibold text-black focus:outline-none border-r-2 border-indigo-200 dark:text-white transition duration-500" onClick={() => setFlag("news")}>
                    News
                  </button>
                  <button className="logo cursor-pointer hover:bg-indigo-200 px-1 py-1 text-xl focus:bg-indigo-700 focus:text-white font-semibold text-black focus:outline-none border-r-2 border-l-2 border-indigo-200 dark:text-white transition duration-500" onClick={() => setFlag("podcasts")}>
                    Podcasts 
                  </button>
                  <button className="logo cursor-pointer hover:bg-indigo-200 px-1 py-1 text-xl focus:bg-indigo-700 focus:text-white font-semibold text-black focus:outline-none border-l-2 border-indigo-200 dark:text-white transition duration-500" onClick={() => setFlag("jobs")}>
                    Jobs 
                  </button>
                  {flag === "news" ? <News /> : flag === "podcasts" ? <PodcastPage /> : <JobsPage />}
               </div>
              </div>
            </div>
        </div>
        </div>
      </div>
    </Parallax>
  )
}

export default Bookmarked;
