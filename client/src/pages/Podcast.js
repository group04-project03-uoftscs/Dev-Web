import React from "react";
import Card from '../components/Card';

import { useStoreContext } from "../utils/GlobalState";

function Podcast() {

  
  const [state, dispatch] = useStoreContext();
  return(
    <div className="my-10">
      Podcasts
      {state.bestPodcasts.length!==0 ?  state.bestPodcasts.map((article) => {
        return (
          <Card article={article} key={article.id}/>
        )
      })
      : 
      <div>Loading</div>
    }
    
    Episodes
      {state.recentEpisodes.length!==0 ?  state.recentEpisodes.map((article) => {
        return (
          <Card article={article} key={article.id}/>
        )
      })
      : 
      <div>Loading</div>
    }
    </div>
  )
}

export default Podcast;
