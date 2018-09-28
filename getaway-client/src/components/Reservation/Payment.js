import React, {Component} from 'react';
import {Label, Input, Form, FormGroup, Col, Row} from 'reactstrap';


export default class Payment extends Component{
  render(){
    return(
        <Form style = {styles.body}>
            <FormGroup style = {styles.checkoutPanel}>
                <h2 >Checkout</h2>
                
                <Row style = {styles.inputFields}> 
                    <Col>
                        <Label for="cardholder">Cardholder's Name</Label>
                        <Input type="text" id="cardholder" />
                        
                        <div style = {styles.smallInputs}>
                            <div>
                                <Label for="date">Valid thru</Label>
                                <Input type="text" id="date" placeholder="MM / YY" />
                            </div>
                                
                            <div>
                                <Label for="verification">CVV / CVC *</Label>
                                <Input type="password" id="verification"/>
                            </div>
                        </div>
                    </Col>
                            
                    <Col>
                        <Label for="cardnumber">Card Number</Label>
                        <Input type="password" id="cardnumber"/>
                        <span style = {styles.info}>* CVV or CVC is the card security code, unique three digits number on the back of your card separate from its number.</span>
                    </Col>
                </Row>
            </FormGroup>
        </Form>
 

    );
  }
}
const styles = {
body:{
    fontFamily: 'Montserrat', 
    display: 'flex',
    width: '100%',
    height: '100%',
    background: '#f4f4f',
    justifyContent: 'center',
    alignItems: 'center',
  },

  checkoutPanel: {
    display: 'flex',
    flexDirection: 'column',
    width: '940px',
    height: '766px',
    backgroundColor: 'rgb(255, 255, 255)',
    boxShadow: '0 1px 1px 0 rgba(0, 0, 0, .2)',
  },

    inputFields: {
    display: 'flex',
    justifyContent: 'space-between',
 },

    smallInputs: {
        display: 'flex',
        marginTop: '20px',
        justifyContent: 'space-between',
      },

    info:{
        marginTop: '60px',
        display: 'flex',
    }
  }

