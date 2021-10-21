import React,{ Component } from 'react';

class HintButton extends Component{
  constructor(props){
    super(props);
    this.triggerParentHint = this.triggerParentHint.bind(this);
  }
  triggerParentHint(){
    this.props.triggerHint();
  }
  render(){
    return(
      <div className="full-width">
        <button className="transparent-button" onClick={this.triggerParentHint}>{this.props.label}</button>
      </div>
    )
  }
}
export default HintButton;
