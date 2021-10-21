import React, { Component } from 'react';

class MatchMe_DefinitionHolder extends Component{
  constructor(props){
    super(props);
    this.state = {
      data: []
    }
    this.renderBlanks = this.renderBlanks.bind(this);
    this.checkSolution = this.checkSolution.bind(this);

    this.handleDrop = this.handleDrop.bind(this);
  }
  checkSolution(event){
    if(!this.props.highlight){
      return false
    }
    //Send the chosen input to the MatchMe Component
    this.props.checkAnswers(event.target.getAttribute('index'),event.target.getAttribute('match'))
  }

  handleDrop(event,target){
    this.checkSolution(event);
  }

  onDragOver = (event) => {
	  event.preventDefault();
	}

  renderBlanks(){
    return this.props.definition.map((item,index) =>{
        if(item.solved != undefined){
          if(!item.solved){
            return(
              <input match={item.match} index={item.index} name="matchMeBlank" value="" readOnly className="matchMe_Input" onDrop={(event)=>this.handleDrop(event, "Done")} onDragOver={(event)=>this.onDragOver(event)} onClick={this.checkSolution}/>
            )
          }else{
            return(
              <span className="green">{item.word}</span>
            )
          }
        }else{
          return(
            <span> {item.word} </span>
          )
        }
    })
  }
  render(){
    let highlightSection = "highlight-container ";
    let highlightDefintion = "definition-para ";
    highlightSection += this.props.highlight ? '' : 'disp-none';
    highlightDefintion += this.props.highlight ? 'highlightInput' : '';
    return(
      <div className={highlightDefintion}>
        <div className={highlightSection}></div>
        <div>
          {this.renderBlanks()}
        </div>
      </div>
  )
  }
}

export default MatchMe_DefinitionHolder;
