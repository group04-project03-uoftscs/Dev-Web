import React, { useState, useEffect, useLayoutEffect, useContext } from "react";
import { useStoreContext } from "../../utils/GlobalState";
import UserDropdown from "./UserDropdown";
import LoginDropdown from "./LoginDropdown";
import ReactImageFallback from "react-image-fallback";

//svg & icons
import { ReactComponent as Bookmark } from "../../assets/svg/icons8-bookmark.svg"
import { ReactComponent as News } from "../../assets/svg/icons8-news.svg"
import Jobs from "../../assets/svg/icons8-job-seeker-96.png"
import Podcast from "../../assets/svg/icons8-browse-podcasts-96.png"
import Login from "../../assets/svg/icons8-user-shield-96.png"

function Nav() {
  const [store] = useStoreContext();
  const Errorpic = 'https://i.pinimg.com/originals/0c/3b/3a/0c3b3adb1a7530892e55ef36d3be6cb8.png';

  return (
    <nav className="fixed top-0 w-full z-30">
        <div className="w-full bg-indigo-500 shadow-md h-12 flex justify-between ">
            <div className="w-full lg:w-4/6 xl:w-full  h-full flex items-center px-4 ">
                <a href="/landing"><img className="fill-current w-8 h-8 lg:w-10 lg:h-10 text-white"
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#3f6aff"
                        src="https://i.postimg.cc/CMBZQw3B/Dev-Web.png"></img></a>

                <div className="relative mx-3" x-data="{dropdown : false}">
                </div>
            </div>

            <div className="hidden md:flex w-full  h-full justify-center">
                <div className="border-b-4 text-white hover:text-black hover:border-blue-600">
                    <a href="/news"
                        className="flex items-center h-full md:w-16 lg:w-24 xl:w-32 justify-center hover:bg-indigo-200 focus:outline-none rounded-md">
                        News
                    </a>
                </div>
                <div className="border-b-4 text-white hover:text-black hover:border-blue-600">
                    <a href="/jobs"
                        className="flex items-center h-full md:w-16 lg:w-24 xl:w-32 justify-center hover:bg-indigo-200 focus:outline-none rounded-md">
                        Jobs
                    </a>
                </div>
                <div className="border-b-4 text-white hover:text-black hover:border-blue-600">
                    <a href="/podcast"
                        className="flex items-center h-full md:w-16 lg:w-24 xl:w-32 justify-center hover:bg-indigo-200 focus:outline-none rounded-md">
                        Podcasts
                    </a>
                </div>
                {/* <div className="border-b-4 text-white hover:text-black hover:border-blue-600">
                    <a href="/playlist"
                        className="flex items-center h-full md:w-16 lg:w-24 xl:w-32 justify-center hover:bg-indigo-200 focus:outline-none rounded-md">
                        Playlists
                    </a>
                </div> */}

            </div>
            <div className="w-full  h-full flex justify-end space-x-2 items-center px-3">
                <a 
                    className="w-8 h-8 lg:h-10 lg:w-10 bg-indigo-100 focus:outline-none hover:bg-yellow-400 rounded-full flex items-center justify-center">
                    <UserDropdown />
                </a>
                <a href="/bookmarked"
                    className="w-8 h-8 lg:h-10 lg:w-10 bg-indigo-100 focus:outline-none bg-gradient-to-br from-yellow-200 via-indigo-200 to-indigo-300 rounded-full flex items-center justify-center">
                    <svg viewBox="0 0 96 96" width="40" height="40" className="rounded-full hover:bg-yellow-400"><Bookmark /></svg>
                </a>
                <a href="/"
                    className="w-8 h-8 lg:h-10 lg:w-10 bg-indigo-100 focus:outline-none bg-gradient-to-br from-yellow-200 via-indigo-200 to-indigo-300 rounded-full flex items-center justify-center">
                    <ReactImageFallback src={Errorpic} fallbackImage={Errorpic} className="rounded-full hover:bg-yellow-400"/>
                </a>
                <a 
                    className="w-8 h-8 lg:h-10 lg:w-10 bg-indigo-100 focus:outline-none hover:bg-yellow-400 rounded-full flex items-center justify-center">
                    <LoginDropdown />
                </a>
            </div>
        </div>
    </nav>
  );
}

export default Nav;
