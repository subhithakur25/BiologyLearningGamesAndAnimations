import React, {Component} from 'react';
import MatchMeOption from './matchMe-option';

class MatchMe_Options extends Component{
  constructor(props){
    super(props);
    this.state = {
      activeIndex: undefined
    }
    this.setOptionActive = this.setOptionActive.bind(this);
    //Remove the selection of the option - function being called from the parent
    this.removeOptionSelection = this.removeOptionSelection.bind(this);
  }
  setOptionActive(index){
    this.setState({
      activeIndex: index
    });
    this.props.lockSelection(index);
  }
  removeOptionSelection(){
    this.setState({
      activeIndex: undefined
    })
  }
  renderOptions(){
    return this.props.options.map((item,index) => (
      <MatchMeOption index={index} option={item} activeItem={this.state.activeIndex} setActive={this.setOptionActive}/>
    ))
  }
  render(){
    return(
      <ul className="matchMe-options">
        {this.renderOptions()}
      </ul>
    )
  }
}


export default MatchMe_Options;
