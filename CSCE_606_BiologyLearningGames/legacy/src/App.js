import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch, HashRouter } from "react-router-dom";
import './App.css';
import './common.css';

import PageHeader from './common/page-header';
import ChooseGame from './choose-game';
import GameViewContainer from './game-view';

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div className="app-container">
          <PageHeader page="BioPro - Learn Biology the fun way" />
          <div className="app-view-container">
            <Route exact path="/" component={ChooseGame} />
            <Route exact path="/game/:id/:level" component={GameViewContainer} />
          </div>
        </div>
      </HashRouter>
    );
  }
}

export default App;
