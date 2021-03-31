import React, { useState, useEffect, useLayoutEffect, useContext } from "react";
import { Link } from "react-router-dom";
import UserDropdown from "./UserDropdown";
import LoginDropdown from "./LoginDropdown";
import ReactImageFallback from "react-image-fallback";
import { useStoreContext } from "../../utils/GlobalState";
import useDarkMode from '../../pages/useDarkMode'

//svg & icons
import { ReactComponent as Bookmark } from "../../assets/svg/icons8-bookmark.svg"
import { ReactComponent as News } from "../../assets/svg/icons8-news.svg"
import Jobs from "../../assets/svg/icons8-job-seeker-96.png"
import Podcast from "../../assets/svg/icons8-browse-podcasts-96.png"
import Login from "../../assets/svg/icons8-user-shield-96.png"

function Nav() {
  const [state, dispatch] = useStoreContext();
  let lego = state.localusername.length%10;
  const Errorpic = 'https://i.pinimg.com/originals/0c/3b/3a/0c3b3adb1a7530892e55ef36d3be6cb8.png';
  const [colorTheme, setTheme] = useDarkMode();

  return (
    useDarkMode(),
    <nav className="fixed top-0 w-full z-30">
        <div className="w-full bg-gradient-to-tr from-blue-500 via-indigo-600 to-indigo-800 dark:bg-gradient-to-tr dark:from-black dark:via-black dark:to-black transition duration-500 shadow-md h-12 flex">
            <div className="logo w-full lg:w-4/6 xl:w-full h-full flex items-center px-4 ">
                <Link to="/"><img className="fill-current rounded-full w-8 h-8 lg:w-10 lg:h-10 text-white"
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#3f6aff"
                        src="https://i.postimg.cc/CMBZQw3B/Dev-Web.png"></img></Link>

                <div className="relative mx-3" x-data="{dropdown : false}">
                </div>
            </div>
            
            <div className="logo hidden md:flex w-full self-center h-full justify-center object-center">
                <div className="border-b-4 text-white hover:text-black hover:border-blue-600">
                    <Link to="/news"
                        className="flex items-center h-full md:w-16 lg:w-24 xl:w-32 justify-center hover:bg-indigo-200 focus:outline-none rounded-md">
                        News
                    </Link>
                </div>
                <div className="logo border-b-4 text-white hover:text-black hover:border-blue-600">
                    <Link to="/jobs"
                        className="flex items-center h-full md:w-16 lg:w-24 xl:w-32 justify-center hover:bg-indigo-200 focus:outline-none rounded-md">
                        Jobs
                    </Link>
                </div>
                <div className="logo border-b-4 text-white hover:text-black hover:border-blue-600">
                    <Link to="/podcast"
                        className="flex items-center h-full md:w-16 lg:w-24 xl:w-32 justify-center hover:bg-indigo-200 focus:outline-none rounded-md">
                        Podcasts
                    </Link>
                </div>
                {/* <div className="border-b-4 text-white hover:text-black hover:border-blue-600">
                    <a href="/playlist"
                        className="flex items-center h-full md:w-16 lg:w-24 xl:w-32 justify-center hover:bg-indigo-200 focus:outline-none rounded-md">
                        Playlists
                    </a>
                </div> */}

            </div>
            <div className="w-full  h-full flex justify-end space-x-2 items-center px-3">
                <div 
                    className="md:hidden flex w-8 h-8 lg:h-10 lg:w-10 bg-indigo-100 focus:outline-none hover:bg-yellow-400 rounded-full items-center justify-center">
                    <UserDropdown />
                </div>
                <Link to="/bookmarked"
                    className="logo w-8 h-8 lg:h-10 lg:w-10 bg-indigo-100 focus:outline-none bg-gradient-to-br from-yellow-200 via-indigo-200 to-indigo-300 rounded-full flex items-center justify-center">
                    <svg viewBox="0 0 96 96" width="40" height="40" className="rounded-full hover:bg-yellow-400"><Bookmark /></svg>
                </Link>
                <Link to="/"
                    className="logo w-8 h-8 lg:h-10 lg:w-10 bg-indigo-100 focus:outline-none bg-gradient-to-br from-yellow-200 via-indigo-200 to-indigo-300 rounded-full flex items-center justify-center ring-1 ring-indigo-300 ring-inset">
                    <ReactImageFallback src={state.user._json !== undefined ? (state.user._json.avatar_url !== undefined ? state.user._json.avatar_url: state.user._json.picture) : Errorpic} fallbackImage={`https://api.randomuser.me/portraits/lego/${lego}.jpg`} className="rounded-full hover:bg-yellow-400"/>
                </Link>
                <div 
                    className="w-8 h-8 lg:h-10 lg:w-10 bg-indigo-100 focus:outline-none hover:bg-yellow-400 rounded-full flex items-center justify-center ring-2 ring-indigo-300 ring-inset">
                    <LoginDropdown />
                </div>
                <div onClick={() => setTheme(colorTheme)}
                    className="logo w-8 h-8 lg:h-10 lg:w-10 bg-indigo-100 focus:outline-none bg-gradient-to-br from-yellow-200 via-indigo-200 to-indigo-300 hover:bg-yellow-400 rounded-full flex items-center justify-center ring-2 ring-indigo-300 ring-inset">
                    {colorTheme === "light" ? (
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
                    ) : (
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
                    )}
                </div>
            </div>
        </div>
    </nav>
  );
}

export default Nav;
