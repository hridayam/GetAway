import React, { Component } from 'react';
import SearchForm from './SearchForm';
import Suggestion from './Suggestion';
import Scroll from '../ScrollUp';
import { Animated } from 'react-animated-css';
import { Button } from 'mdbreact';

import '../picture/slide/1.jpg';
import '../css/Home.css';

export default class Home extends Component{
  constructor(props) {
    super(props);
    this.state={
      viewMoreHover: false
    };
  }

  handleViewMoreClick = () => {
    window.scrollTo({
      top: window.innerHeight,
      left: 0,
      behavior: 'smooth'
    });
  }

  render(){
    return(
      <div>
        <div className="background-image" style={ styles.homeStyle }>
          <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true}>
            <SearchForm/>
          </Animated>
          <Button onClick={this.handleViewMoreClick} className="text-center" style={styles.viewMore}>
            View More <i className="fas fa-chevron-down"></i>
          </Button>
        </div>
        <Scroll/>
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
  viewMore: {
    marginTop: '20vh',
    bottom: '5%',
<<<<<<< HEAD
    color: 'white',
    width: '30%',
    left: '35%',
    fontSize: 14,
    cursor: 'pointer'
=======
    color: 'black',
    width: '100%',
    fontSize: 22,
    cursor: 'pointer',
>>>>>>> 1043644b5ead6a918978eb77b612e7fa427bed00
  }
}
