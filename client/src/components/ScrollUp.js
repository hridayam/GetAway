import React, { Component } from 'react';
import ScrollToTop from 'react-scroll-up';


export default class Home extends Component{
  constructor(props) {
    super(props);
    this.state={};
  }

  render(){
    return(
      <div>
        <ScrollToTop style={ styles.upstyle} showUnder={160}>
          <div class="text-center">
            <i class="far fa-hand-point-up" style={{ fontSize: 50 }}></i>
            <br/>
            <b>Back To Top</b>
          </div>
        </ScrollToTop>
      </div>
    );
  }
}

const styles = {
  upstyle: {
    zIndex: '999'
  }
}
