import React, { Component } from 'react';
import { Link } from "react-router-dom";

class PrimaryButton extends Component{
  constructor(props){
    super(props);
    this.displayDescription = this.displayDescription.bind(this);
  }
  selectGame = (e) => {
    this.props.chooseGame(e.target.id);
  }
  displayDescription(){
    return(
      this.props.description.map((item) => <li>{item}</li>)
    )
  }
  render(){
    return(
      <div id={this.props.id} className="game-descripton" onClick={this.selectGame}>
        <div id={this.props.id} className="primary-btn">{this.props.message}</div>
        <div className="description-holder arrow_box">
          <ul className="">
            {
              this.displayDescription()
            }
          </ul>
        </div>
      </div>
    )
  }
}

export default PrimaryButton;

/*
<Link to={this.props.link} id={this.props.id} level={this.props.levels[0]} className="primary-btn">
  {this.props.message}
</Link>
*/
