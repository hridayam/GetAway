import React, { Component } from 'react';
import SearchForm from './SearchForm';
import Suggestion from './Suggestion';
import ScrollToTop from 'react-scroll-up';
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
        <ScrollToTop style={ styles.upstyle} showUnder={160}>
          <div class="text-center">
            <i class="far fa-hand-point-up" style={{ fontSize: 50 }}></i>
            <br/>
            <b>Back To Top</b>
          </div>
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
    marginTop: '0px',
    paddingTop: '30vh',
    overflowY: 'hidden'
  },
  upstyle: {
    zIndex: '999'
  }
}
