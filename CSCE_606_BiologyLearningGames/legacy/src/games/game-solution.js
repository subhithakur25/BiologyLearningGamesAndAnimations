import React,{ Component } from 'react';

class GameSolution extends Component{
  constructor(props){
    super(props);
    this.state = {}
    this.nextQuesTrigger = this.nextQuesTrigger.bind(this)
  }
  nextQuesTrigger(){
    this.props.nextQuestionTrigger();
  }
  render(){
    return(
      <div className="row modal-solution-container">
        <h1>{this.props.solution}</h1>
        <img src={this.props.image} alt=""/>
        <div className="modal-description-scroll">{this.props.description}</div>
      </div>
    )
  }
}
export default GameSolution;
