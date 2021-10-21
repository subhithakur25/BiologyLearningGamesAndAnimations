import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import './common.css';

import PageHeader from './common/page-header';
/*
import Menu from './common/menu';
import HomePage from './homepage';
*/
import GameContainer from './games/game-container';
import ModalWindow from './common/modal-window';
/*
import Game_LabelMe from './games/game-labelme';
*/

class App extends Component {
  constructor(){
    super();
    this.state = {
      routerConfig: {

      }
    }
  }
  render() {
    return (
      <Router>
        <div className="app-container">
          <PageHeader page="LabelMe"/>
          <div className="app-view-container">
            <Switch>
              <Route path="/">
                <GameContainer />
              </Route>
            </Switch>
            {/* <Route exact path="/" component={GameContainer}/> */}
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
