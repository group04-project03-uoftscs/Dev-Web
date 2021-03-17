import React, { createContext, useReducer, useContext } from "react";
import {
  ADD_FAVORITE,
  REMOVE_FAVORITE,
  UPDATE_FAVORITES,
  UPDATE_TECHNEWS,
  GET_FAVORITES,
  UPDATE_USER,
  UPDATE_JOBS,
  UPDATE_CODEWARS
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
      

    case UPDATE_JOBS:
      return {
        ...state,
        jobs: [...action.items]
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
    codewars: {}
  });
  
  return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
  return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };