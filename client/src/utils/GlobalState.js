import React, { createContext, useReducer, useContext } from "react";
import {
  ADD_FAVORITE,
  REMOVE_FAVORITE,
  UPDATE_FAVORITES,
  UPDATE_TECHNEWS,
  GET_FAVORITES,
  UPDATE_USER,
  UPDATE_JOBS,
  UPDATE_CODEWARS,
  UPDATE_WORLDNEWS,
  UPDATE_PODCASTS,
  UPDATE_EPISODES,
  FOUND_USER,
  LOADING,
  LOADED,
  AUTH_METHOD
} from "./actions";

const StoreContext = createContext();
const { Provider } = StoreContext;

const reducer = (state, action) => {
  switch (action.type) {
    case ADD_FAVORITE:
      return {
        ...state,
        favorites: [action.item, ...state.favorites],
      };
    
    case GET_FAVORITES:
      return {
        ...state,
        favorites: [...state.favorites],
      };

    case UPDATE_FAVORITES:
      return {
        ...state,
        favorites: [...action.items],
      };
  
    case REMOVE_FAVORITE:
      return {
        ...state,
        favorites: state.favorites.filter((item) => {
          return item.id !== action.id; 
        })
      };

    case UPDATE_TECHNEWS:
      return {
        ...state,
        techNews: [...action.items]
      };

    case UPDATE_WORLDNEWS:
      return {
        ...state,
        worldNews: [...action.items]
      };      

    case UPDATE_JOBS:
      return {
        ...state,
        jobs: [...action.items]
      };   

    case UPDATE_EPISODES:
      return {
        ...state,
        recentEpisodes: [...action.items]
      };  

    case UPDATE_PODCASTS:
      return {
        ...state,
        bestPodcasts: [...action.items]
      };

      
    case UPDATE_CODEWARS:
      return {
        ...state,
        codewars: {...action.code}
      };

    case UPDATE_USER:
      return {
        ...state,
        user: {...action.user}
      };
    // new case related to adding user
    case FOUND_USER:
      return {
        ...state,
        user: {...action.user},
        logged: true,
        loading: false
      }
    case LOADING: 
      return {
        ...state,
        loading: true
      }
    case LOADED: 
      return {
        ...state,
        loading: false
      }
    case AUTH_METHOD: {
      return {
        ...state,
        auth: action.auth
      }
    }
  }
}



const StoreProvider = ({value = [], ...props}) => {

  const [state, dispatch] = useReducer(reducer, {
    user : {},
    favorites: [],
    techNews: [],
    worldNews: [],
    recentEpisodes: [],
    bestPodcasts: [],
    jobs: [],
    codewars: {},
    logged: false,
    loading: false,
    auth: ''
  });
  
  return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
  return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };