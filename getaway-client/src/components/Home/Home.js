import React, { Component } from 'react';
import SearchForm from './SearchForm';
import Suggestion from './Suggestion';
import ScrollToTop from 'react-scroll-up';
import '../picture/slide/1.jpg';
import Up from '../picture/arrow.png';
import '../css/Home.css';

export default class Home extends Component{
  constructor(props){
    super(props);
    this.state={};
  }

  render(){
    return(
      <div>
        <div className="background-image" style={ styles.homeStyle }>
          <SearchForm/>
        </div>
        <ScrollToTop style={ styles.upstyle} showUnder={160}>
          <img src={Up} alt={"Up"}/>
        </ScrollToTop>
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
  },
  upstyle: {
    zIndex: '999',
    paddingBottom: '50px'
  }
}
