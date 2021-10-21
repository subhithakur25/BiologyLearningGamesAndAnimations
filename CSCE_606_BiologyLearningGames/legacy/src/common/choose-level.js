import React, { Component } from 'react';

class ChooseLevel extends Component{
  constructor(props){
    super(props);
  }
  render(){
    if(!this.props.showLevels) {
      return null;
    }
    return(
      <React.Fragment>
        <div className="modal-backdrop"></div>
        <div className="modal-window-container">
          {this.props.children}
        </div>
      </React.Fragment>
    )
  }
}
export default ChooseLevel;
