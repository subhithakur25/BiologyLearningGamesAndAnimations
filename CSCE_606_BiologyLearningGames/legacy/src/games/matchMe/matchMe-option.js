import React, { Component } from 'react';

class MatchMeOption extends Component{
  constructor(props){
    super(props);
    this.state = {
      active: false
    }
    this.handleClick = this.handleClick.bind(this);

    this.dragStart = this.dragStart.bind(this);
  }
  handleClick(event){
    this.props.setActive(this.props.index);
    event.stopPropagation();
  }
  dragStart(){
    this.props.setActive(this.props.index);
  }
  render(){
    let inputClasses = "matchme-option ";
    inputClasses += (this.props.index == this.props.activeItem) ? 'active':'';
    return(
      <li id={this.props.index+1} onClick={this.handleClick} draggable onDragStart={this.dragStart} className={inputClasses}>{this.props.option}</li>
    )
  }
}
export default MatchMeOption;
