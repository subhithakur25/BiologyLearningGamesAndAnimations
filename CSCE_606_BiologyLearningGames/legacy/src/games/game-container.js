import React, { Component } from 'react';
import Game_LabelMe from './game-labelme';
import easyData from './EasyLabelMe.json' // TODO: import all data from the current dir

class GameContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: undefined
    }
    this.childKey = 0;
    this.changeQuestion = this.changeQuestion.bind(this);
  }
  componentDidMount() {
    let randomIndex;
    let origin = window.location.origin;
    let url = '/data/LabelMe/' + this.props.level + '.json';

    // fetch(url, {
    //   headers: new Headers({
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json'
    //   })
    // })
    //   .then(res => res.json())
    //   .then((res) => {
    //     randomIndex = Math.floor(Math.random() * res.length);
    //     this.setState({
    //       data: res[randomIndex],
    //       questionBank: res
    //     })
    //   });
    randomIndex = Math.floor(Math.random() * easyData.length);
    this.setState({
      data: easyData[randomIndex],
      questionBank: easyData
    })
    console.log(easyData);
  }
  changeQuestion() {
    let randomIndex = Math.floor(Math.random() * this.state.questionBank.length);
    this.setState({
      data: null
    })
    this.setState({
      data: this.state.questionBank[randomIndex]
    })
  }
  render() {
    if (this.state.data == undefined) {
      return null;
    }
    ++this.childKey;
    return (
      <Game_LabelMe key={this.childKey} solution={this.state.data.solution} nextQuestion={this.changeQuestion} imageSrc={this.state.data.imageSrc} />
    )
  }
}

export default GameContainer;
