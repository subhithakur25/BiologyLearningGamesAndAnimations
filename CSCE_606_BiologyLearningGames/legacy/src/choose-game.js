import React, { Component } from 'react';
import { Link } from "react-router-dom";
import ChooseLevel from './common/choose-level';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import PrimaryButton from './common/button';

class ChooseGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      games: [{
        message: "LabelMe",
        link: "/game/labelMe",
        levels: ['Easy', 'Medium', 'Hard'],
        description: ["Guess the word based on the image that pops up or the text description that shows up along with the image."]
      }, {
        message: "MatchMe",
        link: "/game/matchMe",
        levels: ['Easy', 'Medium', 'Hard'],
        description: ["Drag and drop the answers onto the appropriate blanks based on the description provided."]
      }],
      gameSelected: 0,
      chooseLevelDialog: false
    };
    this.renderLevels = this.renderLevels.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  selectGame = (GameId) => {
    this.setState({
      gameSelected: GameId,
      chooseLevelDialog: true
    })
  }

  // TODO: better to keep levels as a top level piece instead of being per game
  renderLevels() {
    const link = this.state.games[this.state.gameSelected].link;
    return (
      this.state.games[this.state.gameSelected].levels.map((item, index) =>
        <li>
          <Link to={link + '/' + item} index={index}>
            {item}
          </Link>
        </li>
      )
    )
  }

  closeModal() {
    this.setState({
      chooseLevelDialog: false
    })
  }

  render() {
    const button = this.state.games.map((item, index) => <PrimaryButton chooseGame={this.selectGame} description={item.description} id={index} message={item.message} link={item.link} levels={item.levels} />)

    return (
      <React.Fragment>
        <ChooseLevel showLevels={this.state.chooseLevelDialog}>
          <h1 className="choose-level-heading">Pick Level</h1>
          <div className="close-modal" onClick={this.closeModal}>X</div>
          <ul className="chooselevel-container">
            {
              this.renderLevels()
            }
          </ul>
        </ChooseLevel>
        <ReactCSSTransitionGroup
          transitionName="fadeIn"
          transitionEnterTimeout={500}
          transitionAppear={true}
          transitionAppearTimeout={500}
          transitionLeaveTimeout={0}>
          <div className="fullpage-button-ctr">
            {button}
          </div>
        </ReactCSSTransitionGroup>
      </React.Fragment>
    )
  }
}

export default ChooseGame;
