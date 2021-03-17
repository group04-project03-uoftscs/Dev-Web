import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './card.css';
import { useStoreContext } from "../../utils/GlobalState";
import { ADD_FAVORITE, REMOVE_FAVORITE } from '../../utils/actions';
import API from '../../utils/API';

function Card ({article}) {

  const [state, dispatch] = useStoreContext();

  const isBookmarked = state.favorites.filter(item => {
    return item.id == article.id
  }).length == 1;


  // when you click on the button, calls on the api to add the article in the favorite list in the user database
  const addBookmark = () => {
    API.saveFavorite(state.user.username, article)
      .then(result =>{
        console.log(result)
        dispatch({type: ADD_FAVORITE, item: article});
      })
  }

  // when you click on the button, calls on the api to remove the article from the favorite list in the user database
  const removeBookmark = () => {
    API.removeFavorite(state.user.username, article)
      .then(result =>{
        console.log(result)
        dispatch({type: REMOVE_FAVORITE, id: article.id});
      })
  }

  return(
    <div className="card">
        <div className="card-header flex">
          <div>
            
            <a href={article.url}><h3>{article.title}</h3></a>
          </div>
          <div className="span-right">
            {isBookmarked ? 
              <button onClick={removeBookmark}><FontAwesomeIcon icon={['fas','bookmark']} /></button> 
              :
              <button onClick={addBookmark}><FontAwesomeIcon icon={['far','bookmark']} /></button> 
            }
            
          </div>
        </div>

        <div className="card-body">
          <a href={article.url}><img src={article.image}/></a>
          
          <p>Published: {article.date}</p>
        </div>
    </div>
  )
}

export default Card