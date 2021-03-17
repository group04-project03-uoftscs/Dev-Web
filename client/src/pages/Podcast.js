import React from "react";
import Card from '../components/Card';

import { useStoreContext } from "../utils/GlobalState";

function Podcast() {
  
  const [state, dispatch] = useStoreContext();
  console.log(state.bestPodcasts)
  return(
    <div>
      News
      {state.bestPodcasts.length!==0 ?  state.bestPodcasts.map((article) => {
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
