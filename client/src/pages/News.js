import React, {useEffect, useState} from 'react';
import Card from '../components/Card';

import { useStoreContext } from "../utils/GlobalState";

function News () {


  const [state, dispatch] = useStoreContext();
  console.log(state.worldNews)
  return(
<div className="my-14 row"> {state.worldNews.length!==0 ?  state.worldNews.map((article) => {
  return (
    <Card article={article} key={article.id} className={"col-4"}/>
  )
})
: 
<div>Loading</div>}
</div>)}

export default News;