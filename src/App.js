import React from "react";
import './style.css';
import Header from "./components/Header/Header";
import TopGames from "./components/TopGames/TopGames";
import GameStreams from "./components/GameStreams/GameStreams";
import TopStreamers from "./components/TopStreamers/TopStreamers";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import LiveStreamer from "./components/LiveStreamer/LiveStreamer";
import Search from "./components/Search/Search";
import SearchError from "./components/SearchError/SearchError";
import Home from "./components/Home/Home";

function App() {

  return (

    // Le forceRefresh Empêche le state useLocation de fonctionner pour les gameStreams !
    <Router
      // forceRefresh={true}
    >

      <div className="App">
        <Header/>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/game-streams/:slug" component={GameStreams}/>
          <Route exact path="/top-games" component={TopGames}/>
          <Route exact path="/top-streamers" component={TopStreamers}/>
          <Route exact path="/live-streamer/:slug" component={LiveStreamer}/>
          <Route exact path="/recherche/:slug" component={Search}/>
          <Route exact path="/recherche/" component={SearchError}/>
        </Switch>
      </div>

    </Router>

  );

}

export default App;
