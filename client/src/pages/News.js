import React, {useEffect, useState} from 'react';
import Card from '../components/Card';

import { useStoreContext } from "../utils/GlobalState";

function News () {


  const [state, dispatch] = useStoreContext();
  console.log(state.worldNews)
  return(
    <div className="my-10">
      News
      {state.worldNews.length!==0 ?  state.worldNews.map((article) => {
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

export default News;