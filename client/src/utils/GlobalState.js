import React, { createContext, useReducer, useContext } from "react";
import {
  ADD_FAVORITE,
  REMOVE_FAVORITE,
  UPDATE_FAVORITES,
  UPDATE_TECHNEWS,
  GET_FAVORITES,
  UPDATE_USER,
  UPDATE_LOCALUSERNAME,
  UPDATE_LOCATION,
  UPDATE_LANGUAGES,
  UPDATE_JOBS,
  UPDATE_CODEWARS,
  UPDATE_WORLDNEWS,
  UPDATE_PODCASTS,
  UPDATE_EPISODES,
  FOUND_USER,
  LOADING,
  LOADED,
  AUTH_METHOD,
  LOGOUT
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

    case UPDATE_LOCATION: 
      return {
        ...state,
        location: action.location
      }

    case UPDATE_LANGUAGES: 
      return {
        ...state,
        languages: [...action.languages]
      }
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
    
    case UPDATE_LOCALUSERNAME: {
      return {
        ...state,
        localusername: action.username
      }
    }
    case LOGOUT: {
      return {
        ...state,
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
        location: "",
        firstTime: false,
        languages:[],
        auth: '',
        localusername: ''
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
    location: "",
    auth: '',
    languages: [],
    localusername: ''
  });
  
  return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
  return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };