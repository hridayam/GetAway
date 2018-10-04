import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';
import axios from 'axios';

class Payment extends Component{
    constructor(props) {
        super(props);
        this.state = {complete: false};
        this.submit = this.submit.bind(this);
    }
    
    async submit(ev) {
        let {token} = await this.props.stripe.createToken({name: "hridayam"});

        let data = {
            amount: 1000,
            currency: 'usd',
            source: `${token.id}`,
            user_id: 'fdkasjhlf'
        }

        let response = await axios.post('http://localhost:3001/payments/pay', data);


        // let response = await fetch("/charge", {
        //   method: "POST",
        //   headers: {"Content-Type": "text/plain"},
        //   body: token.id
        // });
      
        if (response.ok) this.setState({complete: true});  
    }

    render(){
        if (this.state.complete) return <h1>Purchase Complete</h1>;


    return(
        // <Form style = {styles.body}>
        //     <FormGroup style = {styles.checkoutPanel}>
        //         <h2 >Checkout</h2>
                
        //         <Row style = {styles.inputFields}> 
        //             <Col>
        //                 <Label for="cardholder">Cardholder's Name</Label>
        //                 <Input type="text" id="cardholder" />
                        
        //                 <div style = {styles.smallInputs}>
        //                     <div>
        //                         <Label for="date">Valid thru</Label>
        //                         <Input type="text" id="date" placeholder="MM / YY" />
        //                     </div>
                                
        //                     <div>
        //                         <Label for="verification">CVV / CVC *</Label>
        //                         <Input type="password" id="verification"/>
        //                     </div>
        //                 </div>
        //             </Col>
                            
        //             <Col>
        //                 <Label for="cardnumber">Card Number</Label>
        //                 <Input type="password" id="cardnumber"/>
        //                 <span style = {styles.info}>* CVV or CVC is the card security code, unique three digits number on the back of your card separate from its number.</span>
        //             </Col>
        //         </Row>
        //     </FormGroup>
        // </Form>
        
        <div className="checkout">
            <p>Would you like to complete the purchase?</p>
            <CardElement />
            <button onClick={this.submit}>Send</button>
        </div>

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

export default injectStripe(Payment);
