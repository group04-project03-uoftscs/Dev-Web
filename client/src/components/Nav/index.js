import React from "react";
import { useStoreContext } from "../../utils/GlobalState";

//svg & icons
import { ReactComponent as Bookmark } from "../../assets/svg/icons8-bookmark.svg"
import { ReactComponent as News } from "../../assets/svg/icons8-news.svg"
import Jobs from "../../assets/svg/icons8-job-seeker-96.png"
import Podcast from "../../assets/svg/icons8-browse-podcasts-96.png"
import Login from "../../assets/svg/icons8-login-96.png"

function Nav() {
  const [store] = useStoreContext();

  return (
    <nav class="fixed top-0 w-full z-30">
        <div class="w-full bg-indigo-500 shadow-md h-12 flex justify-between ">
            <div class="w-full lg:w-4/6 xl:w-full  h-full flex items-center px-4 ">
                <a href="/"><img class="fill-current w-8 h-8 lg:w-10 lg:h-10 text-white"
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#3f6aff"
                        src="https://i.postimg.cc/CMBZQw3B/Dev-Web.png"></img></a>

                <div class="relative mx-3" x-data="{dropdown : false}">
                </div>
            </div>

            <div class="hidden md:flex w-full  h-full justify-center">
                <div class="border-b-4 text-white hover:text-black hover:border-blue-600">
                    <a href="/news"
                        class="flex items-center h-full md:w-16 lg:w-24 xl:w-32 justify-center hover:bg-indigo-200 focus:outline-none rounded-md">
                        News
                    </a>
                </div>
                <div class="border-b-4 text-white hover:text-black hover:border-blue-600">
                    <a href="/jobs"
                        class="flex items-center h-full md:w-16 lg:w-24 xl:w-32 justify-center hover:bg-indigo-200 focus:outline-none rounded-md">
                        Jobs
                    </a>
                </div>
                <div class="border-b-4 text-white hover:text-black hover:border-blue-600">
                    <a href="/podcast"
                        class="flex items-center h-full md:w-16 lg:w-24 xl:w-32 justify-center hover:bg-indigo-200 focus:outline-none rounded-md">
                        Podcasts
                    </a>
                </div>
                <div class="border-b-4 text-white hover:text-black hover:border-blue-600">
                    <a href="/settings"
                        class="flex items-center h-full md:w-16 lg:w-24 xl:w-32 justify-center hover:bg-indigo-200 focus:outline-none rounded-md">
                        Settings
                    </a>
                </div>
                <div class="flex xl:hidden border-b-4 hover:border-blue-600">
                    <a href="/settings"
                        class="flex items-center h-full w-16 lg:w-24 xl:w-32 justify-center hover:bg-indigo-200 focus:outline-none rounded-md">
                        Settings
                    </a>
                </div>

            </div>
            <div class="w-full  h-full flex justify-end space-x-2 items-center px-3">

                <a href="/bookmarked"
                    class="w-8 h-8 lg:h-10 lg:w-10 bg-indigo-100 focus:outline-none hover:bg-yellow-400 rounded-full flex items-center justify-center">
                    <svg viewBox="0 0 64 64" width="96px" height="96px"><Bookmark /></svg>
                </a>
                <a href="/news"
                    class="w-8 h-8 lg:h-10 lg:w-10 bg-indigo-100 focus:outline-none hover:bg-yellow-400 rounded-full flex items-center justify-center">
                    <svg viewBox="0 0 64 64" width="96px" height="96px"><News /></svg>
                </a>
                <a href="/jobs"
                    class="w-8 h-8 lg:h-10 lg:w-10 bg-indigo-100 focus:outline-none hover:bg-yellow-400 rounded-full flex items-center justify-center">
                    <img viewBox="0 0 64 64" width="96px" height="96px" src={ Jobs }></img>
                </a>
                <a href="/podcast"
                    class="w-8 h-8 lg:h-10 lg:w-10 bg-indigo-100 focus:outline-none hover:bg-yellow-400 rounded-full flex items-center justify-center">
                    <img viewBox="0 0 64 64" width="96px" height="96px" src={ Podcast }></img>
                </a>
                <a href="/login"
                    class="w-8 h-8 lg:h-10 lg:w-10 bg-indigo-100 focus:outline-none hover:bg-yellow-400 rounded-full flex items-center justify-center">
                    <img viewBox="0 0 64 64" width="96px" height="96px" src={ Login }></img>
                </a>
            </div>
        </div>
    </nav>
  );
}

export default Nav;
