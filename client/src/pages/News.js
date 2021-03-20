import React, {useEffect, useState} from 'react';
import "../styles/background.scss";
import Card from '../components/Card';

import { useStoreContext } from "../utils/GlobalState";

function News () {
  const [offsetY, setOffsetY] = useState(0);
  const handleScroll = () => setOffsetY(window.pageYOffset);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [state, dispatch] = useStoreContext();
  console.log(state.worldNews)

  const renderContent = () => (
    <div>
    News
      <div className="my-14 flex flex-row flex-wrap mx-auto">
      
      {state.worldNews.length!==0 ?  state.worldNews.map((article) => {
        return (
          <Card article={article} key={article.id}/>
        )
      })
      : 
      <div>Loading</div>
      }
      </div>
    </div>
  );

  return(
    <div>
      <section className="Parallax">
        <div
          className="Parallax__background"
          style={{ transform: `translateY(-${offsetY * 0.5}px)` }}
        />
        <div
          className="Parallax__background-triangles"
          style={{ transform: `translateY(${offsetY * 1.0}px)` }}
        />
        <div className="Parallax__content">{renderContent()}</div>
      </section>
    </div>
  )
}

export default News;