import React, { Component } from 'react';
import MatchMe_DefinitionHolder from './matchMe/definition-container';
import MatchMe_Options from './matchMe/options-holder';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import ModalWindow from './../common/modal-window';
import GameSolution from './game-solution';

import easyData from './EasyMatchMe.json';

class Game_MatchMe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: undefined,
      activeSelection: undefined,
      highlight: false,
      activeIndexCheck: undefined,
      closeModal: false
    }

    this.renderIndex = 0;

    this.lockSelection = this.lockSelection.bind(this);
    this.checkSolution = this.checkSolution.bind(this);
    this.removeSelection = this.removeSelection.bind(this);

    this.optionsContainerComponent = React.createRef();

    this.renderBackButton = this.renderBackButton.bind(this);

    this.closeModalWindow = this.closeModalWindow.bind(this);
  }
  componentDidMount() {
    let randomIndex;
    let answerKey = {};
    // let url = 'http://localhost:3000/data/MatchMe/'+this.props.level+'.json';
    let origin = window.location.origin;
    let url = '/data/MatchMe/' + this.props.level + '.json';
    // fetch(url)
    //   .then(res => res.json())
    //   .then((res) => {
    //     this.setState({
    //       questionBank: res
    //     })
    //     if (res.length == 0) {
    //       return false
    //     }
    //     randomIndex = Math.floor(Math.random() * res.length);
    //     let blankCount = 0;
    //     let words = res[randomIndex].definition.split(' ');
    //     let blanks = res[randomIndex].blanks;
    //     let options = res[randomIndex].options;
    //     let wordsHash = words.map((item, index) => {
    //       let checkItem = item.toLowerCase();

    //       if (blanks.indexOf(checkItem.replace(/[^a-zA-Z ]/g, "")) != -1) {
    //         return {
    //           word: item,
    //           index: index,
    //           match: blankCount++,
    //           solved: false
    //         }
    //       } else {
    //         return {
    //           word: item,
    //           index: index
    //         }
    //       }
    //     });

    //     answerKey.solutionDescription = res[randomIndex].solutionDescription;
    //     answerKey.imageSrc = res[randomIndex].imageSrc;

    //     let solutionMap = wordsHash.filter((item) => {
    //       return item.match != undefined
    //     });

    //     this.setState({
    //       data: wordsHash,
    //       solution: solutionMap,
    //       options: options,
    //       answerKey: answerKey
    //     })
    //   });
    this.setState({
      questionBank: easyData
    })
    if (easyData.length == 0) {
      return false
    }
    randomIndex = Math.floor(Math.random() * easyData.length);
    let blankCount = 0;
    let words = easyData[randomIndex].definition.split(' ');
    let blanks = easyData[randomIndex].blanks;
    let options = easyData[randomIndex].options;
    let wordsHash = words.map((item, index) => {
      let checkItem = item.toLowerCase();

      if (blanks.indexOf(checkItem.replace(/[^a-zA-Z ]/g, "")) != -1) {
        return {
          word: item,
          index: index,
          match: blankCount++,
          solved: false
        }
      } else {
        return {
          word: item,
          index: index
        }
      }
    });

    answerKey.solutionDescription = easyData[randomIndex].solutionDescription;
    answerKey.imageSrc = easyData[randomIndex].imageSrc;

    let solutionMap = wordsHash.filter((item) => {
      return item.match != undefined
    });

    this.setState({
      data: wordsHash,
      solution: solutionMap,
      options: options,
      answerKey: answerKey
    })
  }

  closeModalWindow() {
    this.setState({
      closeModal: true
    })
  }

  //To help lock the selection of option before dropping it in the solution blank
  lockSelection(activeIndex) {
    this.setState({
      activeSelection: this.state.options[activeIndex],
      highlight: true
    })
  }
  //Compare the answers once an input is clicked after locking a selection
  checkSolution(index, match) {
    if (this.state.solution[match].word.toLowerCase() == this.state.activeSelection.toLowerCase()) {
      this.setState(state => {
        const words = state.data;
        words[index].solved = true;
        return {
          words: words
        }
      });
    } else {
      //Handle the wrong answer section here
    }
  }
  //Remove the selection of the items and the highlight container
  removeSelection() {
    this.setState({
      highlight: false
    })
    this.optionsContainerComponent.current.removeOptionSelection()
  }
  renderBackButton() {
    return (
      <Link to="/">
        <img src="https://image.flaticon.com/icons/svg/54/54097.svg" className="back-button" />
      </Link>
    )
  }
  render() {
    console.log("rendering match me game");
    this.renderIndex++;
    let solutionFound = false


    if (this.state.solution != undefined) {
      let toFindCount = this.state.solution.filter(item => item.solved == false).length
      if (toFindCount == 0) {
        solutionFound = true
      }
    }

    if (this.state.data != undefined) {
      return (
        <React.Fragment>
          <ModalWindow showSolution={solutionFound && this.state.closeModal == false} closeModal={this.closeModalWindow}>
            <GameSolution image={this.state.answerKey.imageSrc} description={this.state.answerKey.solutionDescription} solution={null} />
          </ModalWindow>
          <div className="definition-holder" onClick={this.removeSelection} onDrop={(event) => this.removeSelection}>
            <MatchMe_DefinitionHolder checkAnswers={this.checkSolution} definition={this.state.data} highlight={this.state.highlight && !solutionFound} blanks={this.state.blanks} />
            <MatchMe_Options options={this.state.options} blanks={this.state.blanks} lockSelection={this.lockSelection} ref={this.optionsContainerComponent} />
            {
              this.renderBackButton()
            }
          </div>
          <div className="bottom-align-container">
            <button className="ques-btn" onClick={this.props.triggerNextQues}>Next Question</button>
          </div>
        </React.Fragment>
      )
    }
    else {
      return <div></div>
    }
  }
}

export default Game_MatchMe;
