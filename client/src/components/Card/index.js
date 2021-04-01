import React, { useEffect, useState } from 'react';
import ReactImageFallback from "react-image-fallback";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import './card.css';
import { useStoreContext } from "../../utils/GlobalState";
import { ADD_FAVORITE, REMOVE_FAVORITE } from '../../utils/actions';
import API from '../../utils/API';
import logo from '../../assets/images/Dev_Web.gif'
import useDarkMode from '../../pages/useDarkMode';

function Card ({article}) {

  const [state, dispatch] = useStoreContext();
  const [isBookmarked, setIsisBookmarked] = useState(state.favorites.filter(item => {
    return item.id == article.id
  }).length == 1);

  // const isBookmarked = state.favorites.filter(item => {
  //   return item.id == article.id
  // }).length == 1;

  // when you click on the button, calls on the api to add the article in the favorite list in the user database
  const addBookmark = (event) => {
    event.preventDefault();
    
    let itemToAdd = {...article}
    if(article.type === "episodes" || article.type === "podcasts" ){
      itemToAdd = {
        id: article.id,
        date: article.date,
        type: article.type,
        source: article.source
      }
      let saved = JSON.parse(localStorage.getItem(article.type));
      saved.push(article);
      localStorage.setItem(article.type, JSON.stringify(saved));
    }

    API.saveFavorite(state.localusername, itemToAdd)
      .then(result =>{
        dispatch({type: ADD_FAVORITE, item: article});
      })
      setIsisBookmarked(true)
  }

  // when you click on the button, calls on the api to remove the article from the favorite list in the user database
  const removeBookmark = (event) => {
    event.preventDefault()
    let itemToAdd = {...article}
    if(article.type === "episodes" || article.type === "podcasts" ){
      itemToAdd = {
        id: article.id,
        date: article.date,
        type: article.type,
        source: article.source
      }

      let saved = JSON.parse(localStorage.getItem(article.type));
      let newSaved = saved.filter(item => item.id !== article.id)
      localStorage.setItem(article.type, JSON.stringify(newSaved));
    }

    API.removeFavorite(state.localusername, article)
      .then(result =>{
        dispatch({type: REMOVE_FAVORITE, id: article.id});
        setIsisBookmarked(false)
      })
  }

  const Errorpic = 'https://i.postimg.cc/fWdKWTTV/Dev-Web.gif';
  const fallbackUrl = 'https://media.giphy.com/media/uprwwjptZW4Za/giphy.gif';

  return(
    useDarkMode,
    <div className="transition-all duration-150 flex px-4 py-6 md:w-1/2 lg:w-1/3 xl:w-1/4">
      <div className="px-4 pb-5 w-80 flex-grow-0 bg-white bg-opacity-50 rounded-xl text-black border border-gray-300 shadow-2xl transform transition duration-500 ease-in-out hover:bg-indigo-100 hover:bg-opacity-50 hover:scale-105">
        
        <div className="w-full mb-3 border-b border-1 border-white">
          <h3 className="text-lg pt-2 font-semibold text-shadow overflow-hidden h-24 line-clamp-3 dark:text-white transition duration-500"><a href={article.url} target="_blank" rel="noopener noreferrer"><h3>{article.title}</h3></a></h3>
        </div>

        <div className="flex flex-col">
          <a href={article.url} target="_blank" rel="noopener noreferrer"><ReactImageFallback className="w-96 h-48 mt-3 object-cover mb-2" initialImage={article.image} src={article.image} fallbackImage={Errorpic} alt="Dev Web logo"/></a>
          
          <div className="mb-0 tracking-wide text-base text-shadow dark:text-white transition duration-500">
            <p>Published: {article.date}</p>
          </div>

          <div className="self-end">          
            {isBookmarked ? 

            <button className="bg-white bg-opacity-0 border border-white px-3 py-1.5 rounded focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-40 hover:bg-yellow-400 text-lg dark:text-white transition duration-500"
                    onClick={removeBookmark}>
              <FontAwesomeIcon icon={['fas','bookmark']} />
            </button> 
              :

              <button className="bg-white bg-opacity-0 border border-white px-3 py-1.5 rounded focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-40 hover:bg-yellow-400 text-lg dark:text-white transition duration-500"
                    onClick={addBookmark}>
              <FontAwesomeIcon icon={['far','bookmark']} />
            </button> 
              
            }
            </div>
        </div>
      </div>
    </div>
    
  )
}

export default Card