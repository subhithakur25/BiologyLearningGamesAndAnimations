import React,{ Component } from 'react';

import BlankComponent from './individualblank'

class GameBlanksHolder extends Component{
  constructor(props){
    super(props);
    this.state = {
      words: []
    }
    this.updateScore = this.updateScore.bind(this);
  }
  returnBlanks(){
    return this.props.words.map((item,outterIndex) => (
      <li className="row game-word-specific-blank" id={outterIndex}>
      {
        item.split('').map((innerItem,innerIndex) => (
          <BlankComponent letter={innerItem} />
        ))
      }
      </li>
    ))
  }
  updateScore(evt){
    this.props.updateParent(evt);
  }
  returnBlankStates(){
    return this.props.words.map((item,index) =>
      {
        if(item.value == ' '){
          return (
              <li className="row game-blank-row" id={index}></li>
          )
        }else{
          return(
            <li className="row game-word-specific-blank" id={index}>
              <BlankComponent isRevealed={item.reveal} letterIndex={item.id} letter={item.value} updateParent={this.updateScore}/>
            </li>
          )
        }
      }
    )
  }
  render(){
    return(
      this.returnBlankStates()
    )
  }
}

export default GameBlanksHolder;
