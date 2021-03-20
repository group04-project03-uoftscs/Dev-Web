import React, { useState, useEffect } from "react";
import "../styles/background.scss";

function Bookmarked() {
  const [offsetY, setOffsetY] = useState(0);
  const handleScroll = () => setOffsetY(window.pageYOffset);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const renderContent = () => (
    <>
      <div className="my-14">
        <h1>All Bookmarks</h1>
        <h2>
          All
        </h2>
        <h2>
          News
        </h2>
        <h2>
          Podcasts
        </h2>
        <h2>
          Jobs
        </h2>
      </div>
    </>
  );

  return (
    <div>
      <section className="Parallax">
        <div
          className="Parallax__background"
          style={{ transform: `translateY(-${offsetY * 0.5}px)` }}
        />
        <div
          className="Parallax__background-triangles"
          style={{ transform: `translateY(${offsetY * 0.8}px)` }}
        />
        <div className="Parallax__content">{renderContent()}</div>
      </section>
    </div>
  );
}

export default Bookmarked;
