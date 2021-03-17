import React from 'react';
import Card from '../components/Card'

import { useStoreContext } from "../utils/GlobalState";

function Home () {
  const [state, dispatch] = useStoreContext();
  console.log(state)
  return(
    <div>
      Home page
      { (Object.keys(state.user).length !== 0 && Object.keys(state.codewars).length !== 0) ? 
        <div>
          User: {state.user.username}
          <br />
          Code: {state.codewars.name}
        </div>
        :
        <div> 
          Loading user account info
        </div>
      }

      <div>
        {state.favorites.length!==0 ?  state.favorites.map((article) => {
          return (
            <Card article={article} key={article.id}/>
          )
        })
        : 
        <div>No Bookmarks</div>
      }
      </div>
      

    </div>
  )
}

export default Home;