import React from 'react';
import moment from 'moment';

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
    index
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

  return (
    <div className="job-card" index={index + 1} style={{ marginLeft:"15px"}}>
      <div className="company-logo">
        <img src={company_logo} alt={company} width="100" height="100"/>
      </div>
      <div className="job-info">
        <div className="job-title">{title}</div>
        <div className="job-location">
          {location} | {type}
        </div>
        <div className="company-name">{company}</div>
      </div>
      <div className="post-info">
        <div className="post-time">
          Posted {moment(new Date(created_at)).fromNow()}
        </div>
      </div>
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
    </div>
  );
};

export default JobCard;