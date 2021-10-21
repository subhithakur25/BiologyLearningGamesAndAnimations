import React, { Component } from 'react';

class ModalWindow extends Component{
  constructor(props){
    super(props);
  }
  render(){
    if(!this.props.showSolution) {
      return null;
    }
    return(
      <React.Fragment>
        <div className="modal-backdrop"></div>
        <div className="modal-window-container">
          <div className="close-modal" onClick={this.props.closeModal}>X</div>
          {this.props.children}
        </div>
      </React.Fragment>
    )
  }
}
export default ModalWindow;
