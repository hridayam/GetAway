import React, {Component} from 'react';
import './css/Home.css';

export default class Footer extends Component{
  render(){
    return(
      <footer style={styles.footerStyle}>
        <p className="navbar-brand">&reg; 2018 GetAway</p>
      </footer>
    );
  }
}

const styles = {
  footerStyle: {

  }
}
