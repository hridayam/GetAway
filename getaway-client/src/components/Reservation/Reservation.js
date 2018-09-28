import React, {Component} from 'react';
import Stepper from './Stepper';
import '../css/Home.css';


export default class Reservation extends Component{
    render(){
        return(
            <div>
            <div className = 'reservation-img' style={ styles.homeStyle}></div>
            <Stepper/>
          </div>
        );
      }
    }
    
const styles = {
    homeStyle: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: '200px',
    },

  }