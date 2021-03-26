import React, { useState, useEffect, useLayoutEffect, useContext } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, useHistory } from "react-router-dom";

import Card from '../components/Card'

import { useStoreContext } from "../utils/GlobalState";

import { AUTH_METHOD, FOUND_USER, LOADED, LOADING, UPDATE_FAVORITES, UPDATE_LOCATION } from '../utils/actions';

import API from '../utils/API';
import { Parallax, ParallaxLayer } from 'react-spring/renderprops-addons'

function Bookmarked() {
  const [state, dispatch] = useStoreContext();
  const [offsetY, setOffsetY] = useState(0);
  const handleScroll = () => setOffsetY(window.pageYOffset);
  const history = useHistory();

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
        <div className="">
          
          <div className="p-5 mt-10 w-1/2 mx-auto items-center justify-center text-white bg-indigo-400 rounded-md shadow-md">
                <div className="flex items-center justify-center">
                  <span className="text-3xl font-semibold tracking-wider uppercase">My Bookmarks</span>
                </div>
          </div>

          <div className="flex mt-20 flex-row flex-wrap w-full mx-auto items-center justify-center">
            {state.favorites.length!==0 ?  state.favorites.map((article) => {
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
        </section>
      </main>
    </Parallax>
  )
}

export default Bookmarked;
