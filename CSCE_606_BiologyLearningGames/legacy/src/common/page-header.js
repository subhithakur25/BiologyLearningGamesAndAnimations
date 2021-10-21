import React, { Component } from 'react';

class PageHeader extends Component{
  constructor(props){
    super(props)
  }

  render(){
    return(
      <h1 className="app-header">{this.props.page}</h1>
    )
  }
}

export default PageHeader;
