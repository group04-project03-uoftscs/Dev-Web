import React, { useState, useEffect, useLayoutEffect, useContext } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, useHistory } from "react-router-dom";

import Card from '../components/Card'
import JobCard from '../components/JobCard'

import { useStoreContext } from "../utils/GlobalState";

import { AUTH_METHOD, FOUND_USER, LOADED, LOADING, UPDATE_FAVORITES, UPDATE_LOCATION } from '../utils/actions';

import API from '../utils/API';
import { Parallax, ParallaxLayer } from 'react-spring/renderprops-addons'

function Bookmarked() {
  const [state, dispatch] = useStoreContext();
  const [offsetY, setOffsetY] = useState(0);
  const handleScroll = () => setOffsetY(window.pageYOffset);
  const history = useHistory();

  function News(props) {
  return (
    <div>
       <div className="flex mt-20 flex-row flex-wrap w-full mx-auto items-center justify-center">
            {state.favorites.filter(article => article.type === "articles").length!==0 ?  state.favorites.filter(article => article.type === "articles").map((article) => {
                return (
                  <Card article={article} key={article.id}/>
                )
            })
            : 
            <div>
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
            <div>
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
            <div>
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

    if(state.auth === 'local') {
      API.getUserInfo(state.localusername)
        .then(data => {
          console.log(data.data[0])
          if(data.data[0].firstTime === true) {
            API.getLocalUserUpdate(state.localusername, {firstTime: false})
            .then(() => {
              history.push('/newUser');
            })
          }
        })
    }

    return () => window.removeEventListener("scroll", handleScroll);
    
  }, []);

  const [flag, setFlag] = useState(false);
  const url = (name, wrap = false) => `${wrap ? 'url(' : ''}https://awv3node-homepage.surge.sh/build/assets/${name}.svg${wrap ? ')' : ''}`

  return(
    <Parallax pages={2}>
      <ParallaxLayer factor={1} offset={0} className="bg-gradient-to-br from-yellow-300 via-indigo-500 to-blue-800" />
      <ParallaxLayer factor={1} offset={1} className="bg-gradient-to-tr from-indigo-300 via-indigo-500 to-blue-800" />
      <ParallaxLayer factor={1} offset={2} className="bg-gradient-to-tr from-indigo-300 via-indigo-500 to-blue-800" />
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
      {console.log(state)}

      <main className="relative w-full h-full">
        <section className="flex flex-col w-full h-full">
        <div className="px-6">
          
          <div className="p-5 mt-10 w-1/2 mx-auto items-center justify-center text-white bg-indigo-400 rounded-md shadow-md">
                <div className="flex items-center justify-center">
                  <span className="text-3xl font-semibold tracking-wider uppercase">My Bookmarks</span>
                </div>
          </div>

           {/* Header */}
              <div className="flex flex-col items-center justify-between">
                <div className="flex-row mx-auto pt-10 p-4">
                  <button className="cursor-pointer hover:bg-indigo-200 px-1 py-1 text-xl focus:bg-indigo-700 focus:text-white font-semibold text-gray-700 focus:outline-none border-r-2 border-indigo-200" onClick={() => setFlag("news")}>
                    News
                  </button>
                  <button className="cursor-pointer hover:bg-indigo-200 px-1 py-1 text-xl focus:bg-indigo-700 focus:text-white font-semibold text-gray-700 focus:outline-none border-r-2 border-l-2 border-indigo-200" onClick={() => setFlag("podcasts")}>
                    Podcasts 
                  </button>
                  <button className="cursor-pointer hover:bg-indigo-200 px-1 py-1 text-xl focus:bg-indigo-700 focus:text-white font-semibold text-gray-700 focus:outline-none border-l-2 border-indigo-200" onClick={() => setFlag("jobs")}>
                    Jobs 
                  </button>
                {flag === "news" ? <News /> : flag === "podcasts" ? <PodcastPage /> : <JobsPage />}
               </div>
              </div>

          




        </div>
        </section>
      </main>
    </Parallax>
  )
}

export default Bookmarked;
