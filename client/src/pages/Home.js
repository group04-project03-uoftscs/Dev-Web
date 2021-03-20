import React, { useState, useEffect } from "react";
import "../styles/background.scss";
import Card from '../components/Card'

import { useStoreContext } from "../utils/GlobalState";

function Home () {
  const [offsetY, setOffsetY] = useState(0);
  const handleScroll = () => setOffsetY(window.pageYOffset);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [state, dispatch] = useStoreContext();
  console.log(state)

  const renderContent = () => (
    <>
      <div className="mx-14 flex flex-col justify-center max-h-full pl-2 pr-2 rounded-md xl:pr-4 gap-y-36">
        
        <div class="p-4 text-white bg-blue-500 rounded-md shadow-md">
              <div class="flex items-center justify-center">
                <span class="text-3xl font-semibold tracking-wider uppercase">Home page</span>
              </div>
            </div>
        { (Object.keys(state.user).length !== 0 && Object.keys(state.codewars).length !== 0) ? 
          <div>
            User: {state.user.username}
            <br />
            Code: {state.codewars.name}
          </div>
          :
          <div>
            <div class="flex items-center w-1/2 justify-center p-4 mt-4 bg-white rounded-md shadow-md">
              <span class="text-xl tracking-wider text-gray-500 uppercase">Loading user account info</span>
            </div> 
          </div>
        }

        <div>
          {state.favorites.length!==0 ?  state.favorites.map((article) => {
            return (
              <Card article={article} key={article.id}/>
            )
          })
          : 
          <div>
            <div class="flex items-center w-1/2 justify-center p-4 mt-4 bg-white rounded-md shadow-md">
              <span class="text-xl tracking-wider text-gray-500 uppercase">No Bookmarks</span>
            </div>
          </div>
        }
        </div>
      </div>
    </>
  );

  return(
    <div>
      <section className="Parallax">
        <div
          className="Parallax__background"
          style={{ transform: `translateY(-${offsetY * 0.5}px)` }}
        />
        <div
          className="Parallax__background-triangles"
          style={{ transform: `translateY(${offsetY * 0.8}px)` }}
        />
        <div className="w-full Parallax__content">{renderContent()}</div>
      </section>
    </div>
  )
}

export default Home;