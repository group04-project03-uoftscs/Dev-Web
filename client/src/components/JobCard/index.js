import React from 'react';
import moment from 'moment';
import ReactImageFallback from "react-image-fallback";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useStoreContext } from "../../utils/GlobalState";
import { ADD_FAVORITE, REMOVE_FAVORITE } from '../../utils/actions';
import API from '../../utils/API';

const JobCard = ({job}) => {

  
  const [state, dispatch] = useStoreContext();

  const {
    id,
    type,
    created_at,
    company,
    location,
    title,
    company_logo,
    index,
    description,
    how_to_apply,
    url
  } = job;

  
  const isBookmarked = state.favorites.filter(item => {
    return item.id == job.id
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
    <div class="max-w-4xl px-10 my-4 py-6 bg-white rounded-lg shadow-md" index={index + 1}>
        <div class="flex justify-between items-center">
            <span class="font-light text-gray-600">Posted {moment(new Date(created_at)).fromNow()}</span>
            <a class="px-2 py-1 bg-gray-600 text-gray-100 font-bold rounded hover:bg-gray-500" href="#">{location}</a>
        </div>
        <div class="mt-2">
            <a class="text-2xl text-gray-700 font-bold hover:text-gray-600" href="#">{title}, {type}</a>
            <p class="mt-2 text-gray-600"></p>
        </div>
        <div class="flex justify-between items-center mt-4">
            <a class="text-blue-600 hover:underline" href={url} target="_blank">Apply Now</a>
            {isBookmarked ? 

<button className="bg-white bg-opacity-0 border border-white px-3 py-1.5 rounded focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-40 hover:bg-yellow-400 text-lg"
        onClick={removeBookmark}>
  <FontAwesomeIcon icon={['fas','bookmark']} />
</button> 
  :

  <button className="bg-white bg-opacity-0 border border-white px-3 py-1.5 rounded focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-40 hover:bg-yellow-400 text-lg"
        onClick={addBookmark}>
  <FontAwesomeIcon icon={['far','bookmark']} />
</button> 
  
}
            <div>
                <a class="flex items-center" href="#">
                    <ReactImageFallback class="mx-4 w-10 h-10 object-cover rounded-full hidden sm:block" initialImage="loader.gif" src={company_logo} fallbackImage={Errorpic} />
                    <h1 class="text-gray-700 font-bold">{company}</h1>
                </a>
            </div>
        </div>
      </div>
  )
};

export default JobCard;