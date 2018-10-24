import React, {Component} from 'react';

export default class Footer extends Component{
  render(){
    return(
      <footer style={styles.footerStyle}>
        <p>&reg; 2018 GetAway</p>
      </footer>
    );
  }
}

const styles = {
  footerStyle: {
    backgroundColor: 'white',
    color: 'black',
    flex: 1
  }
}
