
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Redirect, Route, Switch, Link, useHistory } from "react-router-dom";

import './App.css'
import './styles/tailwind.css'
import './styles/styles.css'

//font awesome - add to library to be used throughout the webiste
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBookmark as fasBookmark } from '@fortawesome/free-solid-svg-icons'
import { faBookmark as farBookmark } from '@fortawesome/free-regular-svg-icons'

//pages
import Home from "./pages/Home";
import Bookmarked from "./pages/Bookmarked";
import Jobs from "./pages/Jobs";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import News from "./pages/News";
import NewUser from "./pages/NewUser";
import Playlist from "./pages/Playlist";
import Podcast from "./pages/Podcast";
import Settings from "./pages/Settings";
import Signup from "./pages/Signup";
import LoadFiles from "./pages/LoadFiles";
import PrivateRoute from "./pages/PrivateRoute"

//components
import Nav from "./components/Nav"
import Footer from "./components/Footer"

import { StoreProvider } from "./utils/GlobalState";

library.add(fasBookmark, farBookmark)


function App() {

  return (
    <Router>
      <div className="page-container">
        <StoreProvider>
          <LoadFiles />
          <Nav />
          <Switch>

            {/* <Route exact path="/landing" component={Landing} /> */}
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <PrivateRoute exact path="/bookmarked" component={Bookmarked}/>
            <PrivateRoute exact path="/jobs" component={Jobs}/>
            <PrivateRoute exact path="/news" component={News} />
            <PrivateRoute exact path="/newuser" component={NewUser} />
            <PrivateRoute exact path="/playlist" component={Playlist} />
            <PrivateRoute exact path="/podcast" component={Podcast} />
            <PrivateRoute exact path="/settings" component={Settings} />


            <Route component={ Home } /> 
          </Switch>
          
          <Footer />
        </StoreProvider>
      </div>
    </Router>
  );
}

export default App;
