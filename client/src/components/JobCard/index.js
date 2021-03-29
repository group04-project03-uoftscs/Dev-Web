import React from 'react';
import moment from 'moment';
import ReactImageFallback from "react-image-fallback";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useStoreContext } from "../../utils/GlobalState";
import { ADD_FAVORITE, REMOVE_FAVORITE } from '../../utils/actions';
import API from '../../utils/API';
import useDarkMode from '../../functions/useDarkMode';

const JobCard = ({job}) => {

  
  const [state, dispatch] = useStoreContext();

  const {
    id,
    position,
    date,
    company,
    location,
    title,
    image,
    index,
    description,
    url
  } = job;

  
  const isBookmarked = state.favorites.filter(item => {
    return item.id == id
  }).length == 1;

  
  // when you click on the button, calls on the api to add the article in the favorite list in the user database
  const addBookmark = () => {
    API.saveFavorite(state.localusername, job)
      .then(result =>{
        console.log(result)
        dispatch({type: ADD_FAVORITE, item: job});
      })
  }

  // when you click on the button, calls on the api to remove the article from the favorite list in the user database
  const removeBookmark = () => {
    API.removeFavorite(state.localusername, job)
      .then(result =>{
        console.log(result)
        dispatch({type: REMOVE_FAVORITE, id: job.id});
      })
  }

const Errorpic = 'https://i.postimg.cc/fWdKWTTV/Dev-Web.gif';

  return(
    useDarkMode,
    <div className="transition-all duration-150 flex px-4 py-6 md:w-1/2 lg:w-1/3 xl:w-1/4" index={index + 1}>
      <div className="px-4 pb-5 w-auto md:w-80 flex-grow-0 bg-white bg-opacity-50 rounded-xl text-black border border-gray-300 shadow-2xl transform transition duration-500 ease-in-out hover:bg-indigo-100 hover:bg-opacity-50 hover:scale-105">
        
        <div className="w-full mb-3">
          <h3 className="text-lg pt-2 mb-1 border-b border-1 border-white font-semibold text-shadow overflow-hidden h-16 line-clamp-2 dark:text-white transition duration-500"><a href={url} target="_blank" rel="noopener noreferrer"><h3>{title}, {position}</h3></a></h3>
          <h1 className="text-gray-700 font-bold h-8 line-clamp-2 transform ease-in-out hover:scale-125 origin-left dark:text-white transition duration-500">{company}</h1>
        </div>

        <div>
          <a className="absolute top-24 right-1 text-sm px-2 py-1 w-auto bg-indigo-600 text-gray-100 font-light rounded hover:bg-gray-500 line-clamp-1 overflow-hidden" href={url} target="_blank">{location}</a>
          <a href={url} target="_blank" rel="noopener noreferrer"><ReactImageFallback className="bg-indigo-200 flex justify-items-center items-center w-72 h-40 mt-5 object-contain rounded-2xl" initialImage={image} src={image} fallbackImage={Errorpic} /></a>
          
          <div className="mb-1 mt-1 tracking-wide text-base text-shadow">
            <span className="font-semibold text-indigo-800 dark:text-white transition duration-500">Posted {moment(new Date(date)).fromNow()}</span>
          </div>
          
          <div className="flex justify-between">
            <a className="text-blue-500 hover:underline" href={url} target="_blank">Apply Now</a>
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
};

export default JobCard;