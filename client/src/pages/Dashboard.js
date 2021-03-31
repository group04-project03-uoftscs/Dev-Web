import React, { useState, useEffect, useLayoutEffect, useContext } from "react";
import "../styles/background.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, useHistory } from "react-router-dom";
import ReactImageFallback from "react-image-fallback";
import useDarkMode from './useDarkMode';

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
    return () => window.removeEventListener("scroll", handleScroll);
    
  }, []);

  let lego = state.localusername.length%10;
  const Errorpic = 'https://i.postimg.cc/fWdKWTTV/Dev-Web.gif';
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

      <main className="relative w-full h-full" style={{ marginBottom:"55px" }}>
        <section className="flex flex-col w-full h-full mb-10">
        <div className="mb-48 md:px-8">
          
          <div className="p-5 mt-10 w-full md:w-1/2 mx-auto items-center justify-center text-white bg-indigo-400 rounded-md shadow-md">
                <div className="flex items-center justify-center">
                  <span className="text-3xl font-semibold tracking-wider uppercase">Welcome {state.user.displayName ? state.user.displayName : state.localusername}!</span>
                </div>
          </div>
          <div className="flex mt-10 w-full mx-auto items-center justify-center">
          { (Object.keys(state.user).length !== 0 && Object.keys(state.codewars).length !== 0) ? 
            <div>
              <div className="w-full">
            <div className="flex flex-col md:flex-row justify-center pb-1">
                    <img src={state.user._json !== undefined ? (state.user._json.avatar_url !== undefined ? state.user._json.avatar_url: state.user._json.picture) : `https://api.randomuser.me/portraits/lego/${lego}.jpg`}
                        className="h-40 w-40 mx-auto rounded-2xl flex items-center justify center border-white border-opacity-100 border-4 bg-gradient-to-br from-yellow-200 via-indigo-200 to-indigo-300  object-cover"
                        alt="username"/>
                    <div className="ml-10">
                        <div className="flex items-center">
                            <h2 className="block leading-relaxed font-light mb-2 text-gray-700 text-3xl dark:text-white transition duration-500">{state.user._json !== undefined ? (state.user._json.login !== undefined ? state.user._json.login : state.user.username) :state.user.username}</h2>
                            <a className="cursor-pointer h-7 px-3 ml-3 outline-none border-transparent text-center rounded border bg-blue-500 hover:bg-blue-600 text-white bg-transparent font-semibold">{state.location ? state.location : 'No location set yet'}</a>
                            
                            <Link to="/bookmarked"><button className="hidden md:inline-flex items-center ml-3 border border-yellow-400 hover:bg-yellow-500 hover:text-white rounded outline-none focus:outline-none bg-transparent text-yellow-300 text-sm py-1 px-2">
                                <span className="block">Bookmarks</span>
                                <svg className="block h-5 w-5 pl-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <FontAwesomeIcon icon={['fas','bookmark']} />
                                </svg>
                            </button></Link>
                            <div className="cursor-pointer ml-2 p-1 border-transparent text-gray-900 rounded-full hover:text-yellow-100 focus:outline-none focus:text-gray-800"
                            aria-label="Settings">
                                <Link to="/settings"><svg className="h-8 w-8" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24">
                                    <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                                    <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg></Link>
                            </div>
                        </div>
                            {state.user._json !== undefined ? 
                              (state.user._json.login !== undefined ?
                              <ul className="flex justify-content-around items-center">
                                <li>
                                    <span className="text-base flex dark:text-white transition duration-500"><span className="font-bold mr-2 dark:text-white transition duration-500">{state.user._json.public_repos} </span> Repos</span>
                                </li>
                                <li>
                                    <span className="text-base flex ml-5 dark:text-white transition duration-500"><span className="font-bold mr-2 dark:text-white transition duration-500">{state.user._json.followers} </span> Followers</span>
                                </li>
                                <li>
                                    <span className="text-base flex ml-5 dark:text-white transition duration-500"><span className="font-bold mr-2 dark:text-white transition duration-500">{state.user._json.following} </span> Following</span>
                                </li>
                              </ul>
                              : null
                              )
                              : null
                            }
                        <br></br>
                        <div className="flex-row flex-wrap">
                          {state.languages.map(lang =>{
                            let term = `devicon-${lang}-plain`;
                            return (
                              <i className={term} key={`lang-${lang}`} style={{fontSize:"30px", color:"purple", marginLeft:"5px"}}></i>
                          )})
                          }
                          <br></br>
                          {state.user._json !== undefined ? 
                            state.user._json.bio !==undefined ? 
                            <div>
                              <span className="text-base font-semibold dark:text-white transition duration-500">{state.user._json.bio}</span>
                              <a className="block text-base text-yellow-500 mt-2" href={state.user._json.html_url} target="_blank">{'Quick! To my Github!'}</a>
                            </div>
                              : <a className="block text-base text-yellow-500 mt-2">{'No Github Account linked'}</a>
                            : <a className="block text-base text-yellow-500 mt-2">{'No Github Account linked'}</a>
                          }
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
          
        
          <div className="flex mt-10 w-full md:w-3/4 mx-auto items-center justify-center bg-opacity-30 bg-indigo-300 rounded-3xl">
          { (Object.keys(state.user).length !== 0 && Object.keys(state.codewars).length !== 0) ? 
            <div>
              <div className="w-full mb-1">
            <div className="md:flex justify-center pb-1">
                    <div className="md:ml-10 p-2">
                        <div className="flex flex-col sm:flex-wrap md:flex-row my-2 mt-2">
                          <h2 className="leading-relaxed font-light mb-1 text-gray-700 text-xl dark:text-white transition duration-500">Your Codewars Challenge</h2>
                            <a className="cursor-pointer px-3 p-1 ml-3 outline-none border-transparent text-center rounded border bg-blue-500 hover:bg-blue-600 text-white bg-transparent font-semibold">{state.codewars.name}</a>
                            <a className="cursor-pointer hidden md:flex px-3 p-1 ml-3 focus:outline-none hover:border-transparent text-center rounded border border-green-400 hover:bg-green-500 hover:text-white bg-transparent text-green-200 font-semibold">{state.codewars.category}</a>
                            
                        </div>
                        <ul className="flex md:flex-row sm:flex-col flex-wrap justify-content-around items-center">
                            <li>
                                <span className="text-base flex dark:text-white transition duration-500"><span className="font-bold mr-2 dark:text-white transition duration-500">{state.codewars.totalAttempts} </span> Attempts</span>
                            </li>
                            <li>
                                <span className="cursor-pointer text-base flex ml-5 dark:text-white transition duration-500"><span className="font-bold mr-2 dark:text-white transition duration-500">{state.codewars.totalCompleted} </span> Completed</span>
                            </li>
                            <li>
                                <span className="cursor-pointer text-base flex ml-5 dark:text-white transition duration-500"><span className="font-bold mr-2 dark:text-white transition duration-500">{state.codewars.voteScore} </span> Votes</span>
                            </li>
                        </ul>
                        <div className="">
                            <h1 className="text-xl font-bold dark:text-white transition duration-500">{state.codewars.tags.slice(0, Math.min(4, state.codewars.tags.length)).join(", ")}</h1>
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
              <div className="flex w-full mx-auto items-center justify-center p-4 bg-white rounded-md shadow-md" style={{ marginBottom:"20px"}}>
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

export default Dashboard;