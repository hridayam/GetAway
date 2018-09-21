import React, { Component } from 'react';
import SearchForm from './SearchForm';
import Suggestion from './Suggestion';

import '../picture/slide/1.jpg';
import '../css/Home.css';

export default class Home extends Component{
  constructor(props) {
    super(props);
    this.state={};
  }

  render(){
    return(
      <div>
        <div className="background-image" style={ styles.homeStyle }>
          <SearchForm/>
        </div>
        <Suggestion/>
      </div>
    );
  }
}

const styles = {
  homeStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '-30px',
    paddingTop: '200px',
    overflowY: 'hidden'
  }
}
