import React,{ Component } from 'react';
import image from './../assets/mitochondria.jpg';

import './game.css';
import ModalWindow from './../common/modal-window';
import GameBlanksHolder from './game-blanks';
import GameSolution from './game-solution';
import HintButton from './../common/hint-button';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Game_LabelMe extends Component{
  constructor(props){
    super(props);
    this.state = {
      words: [],
      toFind: [],
      remainingCount: undefined,

      solutionDescription: "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop",
      solution: this.props.solution,
      closeModal: false
    }
    this.updateScoreObj = this.updateScoreObj.bind(this);
    this.triggerHint = this.triggerHint.bind(this);
    this.closeModal = this.closeModal.bind(this);

    this.renderHintButton = this.renderHintButton.bind(this);

    this.renderBackButton = this.renderBackButton.bind(this);
    this.triggerNextQuestion = this.triggerNextQuestion.bind(this);
  }

  componentDidMount(){
      const arr = [];
      let obj = {};

      let solutionLength = this.props.solution.length;
      let randomize = [];
      //Find random characters to show hints in the beginning itself. Number of characters to show depends on the level chosen. For now let "this.props.level" denote the number of open values. Later stages create a hash table mapping level with number of solved blanks(TODO).
      for(var i=0;i<this.props.level;i++){randomize.push(Math.floor(Math.random() * Math.floor(solutionLength)))}

      this.props.solution.split('').map((item,index) => (
        obj = {},
        obj.value = item,
        obj.id = index,
        obj.reveal = randomize.indexOf(index) !== -1 ? true : false,
        obj.resolved = false,
        arr.push(obj)
      ));

      // To identify all the characters that need to be found in the array
      let unsolvedBlanks = arr.filter(item => (item.reveal === false && item.resolved === false && item.value !== ' ')).map(item => item.id)


      this.setState({
        words: arr,
        toFind: unsolvedBlanks,
        remainingCount: unsolvedBlanks.length
      });
  }

  updateScoreObj(index){
    this.setState(state => {
      const list = state.words;
      list[index].resolved = true;
      return{
        words: list,
        remainingCount: list.filter(item => (item.reveal === false && item.resolved === false && item.value !== ' ')).length,
        toFind: list.filter(letter => letter.reveal === false && letter.resolved === false && letter.value !== ' ').map(item => item.id)
      }
    });
  }

  triggerHint(){
    if(this.state.remainingCount <= 0){
      return false
    }
    let hintIndex = this.state.toFind[Math.floor(Math.random() * this.state.toFind.length)];

    this.setState(state => {
      const letters = this.state.words;
      letters[hintIndex].reveal = true;
      return{
        words: letters,
        remainingCount: letters.filter(item => (item.reveal === false && item.resolved === false && item.value !== ' ')).length,
        toFind: letters.filter(letter => letter.reveal === false && letter.resolved === false && letter.value !== ' ').map(item => item.id)
      }
    })
  }

  renderHintButton(){
    if(this.state.remainingCount > 0){
        return (<HintButton triggerHint={this.triggerHint} label="Hint"/>)
    }
  }

  closeModal(){
    this.setState({
      closeModal: true
    })
  }

  renderBackButton(){
    return(
        <Link to="/">
          <img src="https://image.flaticon.com/icons/svg/54/54097.svg" className="back-button"/>
        </Link>
    )
  }

  renderNextQuesButton(){
    return(
        <button className="ques-btn" onClick={this.triggerNextQuestion}>Next Question</button>
    )
  }

  triggerNextQuestion(){
    this.props.nextQuestion()
  }

  render(){
    return(
      <React.Fragment>
        {
          this.renderBackButton()
        }
        <ModalWindow showSolution={this.state.remainingCount == 0 && this.state.closeModal == false} closeModal={this.closeModal}>
          <GameSolution image={this.props.imageSrc} description={this.state.solutionDescription} solution={this.state.solution} nextQuestionTrigger={this.triggerNextQuestion}/>
        </ModalWindow>
        <div className="row game-detail-container">
          <div className="game-image-container">
            <img src={this.props.imageSrc}/>
          </div>

          <div className="game-blanks-container">
            <ul className="game-blanks-holder row">
              <GameBlanksHolder words={this.state.words} updateParent={this.updateScoreObj}/>
            </ul>
          </div>

          <div className="bottom-align-container">
            {
              this.renderHintButton()
            }
            {
              this.renderNextQuesButton()
            }
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default Game_LabelMe;


/*
<div className="game-detail-desc-ctr">

</div>
*/
