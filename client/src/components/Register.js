import React, { Component } from 'react';
import Suggestion from '../components/Home/Suggestion';
import RegisterForm from './RegisterForm';
import Scroll from '../components/ScrollUp';

export default class Register extends Component{
  constructor(props) {
    super(props);
    this.state={};
  }

  render(){
    return(
      <div>
        <div style={ styles.registerStyle }>
        </div>
        <RegisterForm/>
        <Scroll/>
        <Suggestion/>
      </div>
    );
  }
}

const styles = {
  registerStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '0px',
    paddingTop: '10vh',
    overflowY: 'hidden',
    height: '30px',
    backgroundColor: 'black'
  }
}