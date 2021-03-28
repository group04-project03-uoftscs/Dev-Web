import React, { useState, useEffect, useLayoutEffect, useContext } from "react";
import "../styles/background.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, useHistory } from "react-router-dom";
import ReactImageFallback from "react-image-fallback";
import Font, {Text} from "react-font";

import Card from '../components/Card'

import { useStoreContext } from "../utils/GlobalState";

import { AUTH_METHOD, FOUND_USER, LOADED, LOADING, UPDATE_FAVORITES, UPDATE_LOCATION } from '../utils/actions';

import API from '../utils/API';
import { Parallax, ParallaxLayer } from 'react-spring/renderprops-addons'
import JobCard from "../components/JobCard";

function Dashboard () {
  const [state, dispatch] = useStoreContext();
  const [offsetY, setOffsetY] = useState(0);
  const handleScroll = () => setOffsetY(window.pageYOffset);
  const history = useHistory();

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    if(state.auth === 'local') {
      API.getUserInfo(state.localusername)
        .then(data => {
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

  let lego = state.localusername.length%10;//Math.floor(Math.random() * 10);
  const Errorpic = 'https://i.postimg.cc/fWdKWTTV/Dev-Web.gif';
  const url = (name, wrap = false) => `${wrap ? 'url(' : ''}https://awv3node-homepage.surge.sh/build/assets/${name}.svg${wrap ? ')' : ''}`

  return(
    <Parallax>
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

      <main className="relative w-full h-full" style={{ marginBottom:"55px" }}>
        <section className="flex flex-col w-full h-full">
        <div className="mb-48 px-8">
          
          <div className="p-5 mt-10 w-full md:w-1/2 mx-auto items-center justify-center text-white bg-indigo-400 rounded-md shadow-md">
                <div className="flex items-center justify-center">
                  <span className="text-3xl font-semibold tracking-wider uppercase">Welcome {state.user.displayName}!</span>
                </div>
          </div>
          <div className="flex mt-10 w-full mx-auto items-center justify-center">
          { (Object.keys(state.user).length !== 0 && Object.keys(state.codewars).length !== 0) ? 
            <div>
              <div className="w-full">
            <div className="flex justify-center pb-1">
                    <img src={state.user._json !== undefined ? (state.user._json.avatar_url !== undefined ? state.user._json.avatar_url: state.user._json.picture) : `https://api.randomuser.me/portraits/lego/${lego}.jpg`}
                        className="h-40 w-40 rounded-2xl hidden md:inline-flex border-white border-opacity-100 border-4 bg-gradient-to-br from-yellow-200 via-indigo-200 to-indigo-300  object-cover"
                        alt="username"/>
                    <div className="ml-10">
                        <div className="flex items-center">
                            <h2 className="block leading-relaxed font-light mb-2 text-gray-700 text-3xl">{state.user.username}</h2>
                            <a className="cursor-pointer h-7 px-3 ml-3 outline-none border-transparent text-center rounded border bg-blue-500 hover:bg-blue-600 text-white bg-transparent font-semibold">{state.location ? state.location : 'No location set yet'}</a>
                            
                            <Link to="/bookmarked"><button className="hidden md:inline-flex items-center ml-3 border border-yellow-400 hover:bg-yellow-500 hover:text-white rounded outline-none focus:outline-none bg-transparent text-yellow-300 text-sm py-1 px-2">
                                <span className="block">Bookmarks</span>
                                <svg className="block h-5 w-5 pl-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <FontAwesomeIcon icon={['fas','bookmark']} />
                                </svg>
                            </button></Link>
                            <div className="cursor-pointer ml-2 p-1 border-transparent text-gray-700 rounded-full hover:text-yellow-100 focus:outline-none focus:text-gray-800"
                            aria-label="Settings">
                                <Link to="/settings"><svg className="h-8 w-8" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24">
                                    <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                                    <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg></Link>
                            </div>
                        </div>
                        <ul className="flex justify-content-around items-center">
                            <li>
                                <span className="text-base flex"><span className="font-bold mr-2">{state.user._json !== undefined ? state.user._json.public_repos : 'No public repos'} </span> Repos</span>
                            </li>
                            <li>
                                <span className="text-base flex ml-5"><span className="font-bold mr-2">{state.user._json !== undefined ? state.user._json.followers : 0} </span> Followers</span>
                            </li>
                            <li>
                                <span className="text-base flex ml-5"><span className="font-bold mr-2">{state.user._json !== undefined ? state.user._json.following : 0} </span> Following</span>
                            </li>
                        </ul>
                        <br></br>
                        <div className="flex-row flex-wrap">
                            <h1 className="text-xl font-bold">{state.user._json !== undefined ? state.user._json.name : state.user.username}</h1>
                              {state.languages.map(lang =>{
                                let term = `devicon-${lang}-plain`;
                                return (
                                  <i class={term} key={`lang-${lang}`} style={{fontSize:"30px", color:"purple", marginLeft:"5px"}}></i>
                              )})
                              }
                              <br></br>
                            <span className="text-base font-semibold">{state.user._json !== undefined ? state.user._json.bio : 'No bio'}</span>
                            <a className="block text-base text-yellow-500 mt-2" href={state.user._json !== undefined ? state.user._json.html_url : 'No url'} target="_blank">{state.user._json !== undefined ? 'Quick! To my Github!' : 'No Github Account linked'}</a>
                        </div>
                    </div>
                  </div>  
            </div>
            </div>
            :
            <div>
              <div className="flex items-center w-1/2 justify-center p-4 mt-4 bg-white rounded-md shadow-md">
                <span className="text-xl tracking-wider text-gray-500 uppercase">Loading user account info</span>
              </div> 
            </div>
          }
          </div>
          
        
          <div className="flex mt-10 w-3/4 mx-auto items-center justify-center bg-opacity-30 bg-indigo-300 rounded-3xl">
          { (Object.keys(state.user).length !== 0 && Object.keys(state.codewars).length !== 0) ? 
            <div>
              <div className="w-full mb-1">
            <div className="md:flex justify-center pb-1">
                    <div className="ml-10">
                        <div className="flex sm:flex-col sm:flex-wrap md:flex-row my-2 mt-2">
                          <h2 className="leading-relaxed font-light mb-1 text-gray-700 text-xl">Your Codewars Challenge</h2>
                            <a className="cursor-pointer px-3 p-1 ml-3 outline-none border-transparent text-center rounded border bg-blue-500 hover:bg-blue-600 text-white bg-transparent font-semibold">{state.codewars.name}</a>
                            <a className="cursor-pointer hidden md:flex px-3 p-1 ml-3 focus:outline-none hover:border-transparent text-center rounded border border-green-400 hover:bg-green-500 hover:text-white bg-transparent text-green-200 font-semibold">{state.codewars.category}</a>
                            
                        </div>
                        <ul className="flex md:flex-row sm:flex-col flex-wrap justify-content-around items-center">
                            <li>
                                <span className="text-base flex"><span className="font-bold mr-2">{state.codewars.totalAttempts} </span> Attempts</span>
                            </li>
                            <li>
                                <span className="cursor-pointer text-base flex ml-5"><span className="font-bold mr-2">{state.codewars.totalCompleted} </span> Completed</span>
                            </li>
                            <li>
                                <span className="cursor-pointer text-base flex ml-5"><span className="font-bold mr-2">{state.codewars.voteScore} </span> Votes</span>
                            </li>
                        </ul>
                        <div className="">
                            <h1 className="text-xl font-bold">{state.codewars.tags.slice(0, Math.min(4, state.codewars.tags.length)).join(", ")}</h1>
                            <h2 className="text-base pr-7 text-gray-200 font-semibold  overflow-hidden line-clamp-5">{state.codewars.formatDescription.map((text, index)=>{
                              if(index%2 === 0) return (<div key={`code-${index}`}>{text}</div>)
                              else return (<code className="text-green-300"  key={`code-${index}`}>{text}</code>)
                            })}</h2>
                            <div className="flex flex-row flex-wrap m-1">
                              {state.codewars.languages.slice(0, Math.min(6, state.codewars.languages.length)).map(lang =>{
                                return (
                                  <i className={`devicon-${lang}-plain colored`} key={`code-${lang}`} style={{fontSize:"20px", marginLeft:"5px"}}></i>
                              )})
                              }
                            </div>
                            <h2 className="text-base text-green-200 flex-wrap font-semibold">{state.codewars.languages.slice(0, Math.min(6, state.codewars.languages.length)).join(", ")}</h2>
                            <a className="block text-base text-yellow-500 mt-2" href={state.codewars.url} target="_blank">Check it out on CodeWars!</a>
                        </div>
                    </div>
                  </div>  
            </div>
            </div>
            :
            <div>
              <div className="flex items-center w-1/2 justify-center p-4 mt-4 bg-white rounded-md shadow-md">
                <span className="text-xl tracking-wider text-gray-500 uppercase">Loading codewars account info</span>
              </div> 
            </div>
          }
          </div>

          <div className="flex mt-20 flex-row flex-wrap w-full mx-auto items-center justify-center">
            {state.favorites.length!==0 ?  state.favorites.slice(0,Math.min(state.favorites.length,5)).map((article) => {
              if(article.type ==="jobs") {
                return (
                  <JobCard job={article} key={article.id}/>
                )
              }
              else{
                return (
                  <Card article={article} key={article.id}/>
                )
              }
            })
            : 
            <div>
              <div className="flex w-full mx-auto items-center justify-center p-4 bg-white rounded-md shadow-md">
                <span className="text-xl tracking-wider text-gray-500 uppercase">No Bookmarks</span>
              </div>
            </div>
          }
          </div>
        </section>
      </main>
    </Parallax>
  )
}

export default Dashboard;