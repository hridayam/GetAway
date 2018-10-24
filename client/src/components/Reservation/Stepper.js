
import React, { Component } from 'react';
import StepZilla from 'react-stepzilla'
import Step1 from './SelectHotel'
import Step2 from './ChooseRoom'
import Step3 from './Payment'
import Step4 from './Confirmation'

import './stepper.css'

export default class Reservation extends Component {
  constructor(props) {
    super(props);
    this.state = {};}

  render() {
    const steps =
    [
      {name: 'Select Hotel', component: <Step1/>},
      {name: 'Choose Room', component: <Step2/>},
      {name: 'Make Payment', component: <Step3/>},
      {name: 'Confirmation', component: <Step4/>},
    ]

    return (
      <div className='examples' style={ styles.stepper}>
           <div className='step-progress'>
                <StepZilla 
                steps={steps}
                showNavigation = {false}
                hocValidationAppliedTo = {[0]}
                />
         </div>
    
      </div>
    )
  }
}


const styles = {
    stepper: {
        textAlign: 'center',
    },

  }