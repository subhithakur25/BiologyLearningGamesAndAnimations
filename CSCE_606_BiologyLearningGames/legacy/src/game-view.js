import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import GameContainer from './games/game-container';
import Game_MatchMe from './games/game-matchme';

class GameViewContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeRoute: undefined,
      refreshChild: true
    }
    this.triggerNextQues = this.triggerNextQues.bind(this);
    this.index = 0;
  }
  componentDidMount() {

  }
  triggerNextQues() {
    this.setState({
      refreshChild: !this.state.refreshChild
    })
  }
  render() {
    this.index++;
    return (
      <React.Fragment>
        <Route path={"/game/labelMe"} level={this.props.match.params.level} render={(props) => <GameContainer {...props} level={this.props.match.params.level} />} />
        <Route path={"/game/matchMe"} level={this.props.match.params.level} render={(props) => <Game_MatchMe {...props} triggerNextQues={this.triggerNextQues} refreshState={this.state.refreshChild} level={this.props.match.params.level} index={this.index} />} />
      </React.Fragment>
    )
  }
}

export default GameViewContainer;
