import React, {Component} from 'react';

class Menu extends Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <React.Fragment>
        <ul>
          <li>{this.props.match.url}</li>
          <li>Game 1</li>
          <li>Game 2</li>
        </ul>
      </React.Fragment>
    )
  }
}

export default Menu;
