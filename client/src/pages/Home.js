import React, { useState, useEffect, useLayoutEffect, useContext } from "react";
import "../styles/background.scss";

import Card from '../components/Card'

import { useStoreContext } from "../utils/GlobalState";

import { FOUND_USER, LOADED, LOADING } from '../utils/actions';

import { useHistory } from 'react-router-dom';
import API from '../utils/API';

function Home () {
  const [offsetY, setOffsetY] = useState(0);
  const handleScroll = () => setOffsetY(window.pageYOffset);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [state, dispatch] = useStoreContext();

  console.log(state);
  const history = useHistory();

  useLayoutEffect(() => {
    dispatch({
      type: LOADING
    })
    async function getUser() {
      const {data} = await API.getUser();
      console.log(data);
      console.log(data.hasOwnProperty('user'))
      if(data.hasOwnProperty('user')) {
        const userData = data.user
        console.log(userData);
        dispatch({
          type: FOUND_USER,
          user: userData
        });
        API.findGithubUser(userData.id)
        .then(githubData=> {
          console.log(githubData.data.length)
          if(!githubData.data.length){
            let newGithubUserData = {
              username: userData.username,
              github: userData._json,
              auth: 'github',
              location: userData._json.location,
              languages: '',
              favorites: []
            }
            API.addGithubUser(newGithubUserData)
            .then(() => {
              history.push('/newuser')
            }) 
          } else {
            return;
          }
        })
      } else if(!data.hasOwnProperty('user')) {
        dispatch({
          type: LOADED
        })
        history.push('/login')
      }
    }
    getUser();
  }, [state.logged]);

  console.log(state)

  const renderContent = () => (
    <>
      <div className="mx-14 flex flex-col justify-center max-h-full pl-2 pr-2 rounded-md xl:pr-4 gap-y-36">
        
        <div className="p-4 text-white bg-blue-500 rounded-md shadow-md">
              <div className="flex items-center justify-center">
                <span className="text-3xl font-semibold tracking-wider uppercase">Welcome {state.user.username}!</span>
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
            <div className="flex items-center w-1/2 justify-center p-4 mt-4 bg-white rounded-md shadow-md">
              <span className="text-xl tracking-wider text-gray-500 uppercase">Loading user account info</span>
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
            <div className="flex items-center w-1/2 justify-center p-4 mt-4 bg-white rounded-md shadow-md">
              <span className="text-xl tracking-wider text-gray-500 uppercase">No Bookmarks</span>
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