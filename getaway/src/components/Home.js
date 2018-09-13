
import React, { Component } from 'react';
import NavBar from './NavBar';
import SearchForm from './SearchForm';
import Suggestion from './Suggestion';

import '../picture/slide/1.jpg';
import './css/Home.css';

export default class Home extends Component{
  constructor(props){
    super(props);
    this.state={};
  }

  render(){
    return(
      <div>
        <div className="background-image">
          <NavBar/>
          <SearchForm/>
        </div>
        <Suggestion/>
      </div>
    );
  }
}
