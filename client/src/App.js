import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Redirect, Route, Switch, Link, useHistory } from "react-router-dom";

//font awesome - add to library to be used throughout the webiste
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBookmark as fasBookmark } from '@fortawesome/free-solid-svg-icons'
import { faBookmark as farBookmark } from '@fortawesome/free-regular-svg-icons'


//pages
import Home from "./pages/Home";
import Bookmarked from "./pages/Bookmarked";
import Jobs from "./pages/Jobs";
import Login from "./pages/Login";
import News from "./pages/News";
import NewUser from "./pages/NewUser";
import Playlist from "./pages/Playlist";
import Podcast from "./pages/Podcast";
import Settings from "./pages/Settings";
import Signup from "./pages/Signup";
import LoadFiles from "./pages/LoadFiles";

//components
import Nav from "./components/Nav"

import { StoreProvider } from "./utils/GlobalState";

library.add(fasBookmark, farBookmark)


function App() {

  return (
    <Router>
      <div>
        <StoreProvider>
          <LoadFiles />
          <Nav />
          <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path="/bookmarked" component={Bookmarked} />
              <Route exact path="/jobs" component={Jobs} />
              <Route exact path='/login' component={Login} />
              <Route path="/news" component={News} />
              <Route path="/newuser" component={NewUser} />
              <Route path="/playlist" component={Playlist} />
              <Route path="/podcast" component={Podcast} />
              <Route path="/settings" component={Settings} />
              <Route path="/signup" component={Signup} />
          </Switch>
        </StoreProvider>
      </div>
    </Router>
  );
}

export default App;
