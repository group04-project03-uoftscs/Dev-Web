import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { StoreProvider } from "./utils/GlobalState";

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

//components
import Nav from "./components/Nav"

function App() {
  return (
    <Router>
      <div>
        <StoreProvider>
          <Nav />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/bookmarked" component={Bookmarked} />
            <Route exact path="/jobs" component={Jobs} />
            <Route path="/login" component={Login} />
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
