import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';
import axios from 'axios';
import {Button, Form, FormGroup, Col, Row, Input, Label, Card, CardTitle} from 'reactstrap';
import Scroll from '../ScrollUp';

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
        <Form style = {styles.body}>
            <FormGroup >
                <h2 >Checkout</h2>
                <Card body outline color="info" style={styles.panel} >
                    <CardTitle>REVIEW ORDER</CardTitle>
                    <Row > 
                        <Col xs="3">
                            {/* Picture */}
                        </Col>
                        <Col xs="auto">
                            {/* Hotel and room information */}
                        </Col>
                        <Col xs="3">
                            {/* Total price */}
                        </Col>

                    </Row>
                </Card>

                <Card body outline color="info" style={styles.panel}>
                    <CardTitle>BILLING ADDRESS</CardTitle>
                    <Row>
                        <Col >
                            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                <Label for="exampleDate"> First Name:  </Label>
                                <Input  placeholder="Enter your first name" />
                            </FormGroup>
                        </Col>

                        <Col >
                            <FormGroup inline className="mb-2 mr-sm-2 mb-sm-0">
                                <Label for="exampleDate"> Last Name:  </Label>
                                <Input placeholder="Enter your last name" />
                            </FormGroup>
                        </Col>
                    </Row>

                    <FormGroup>
                        <Label for="exampleAddress">Address</Label>
                        <Input type="text" name="address" id="exampleAddress" placeholder="1234 Main St"/>
                    </FormGroup>

                    <Row form>
                        <Col md={6}>
                            <FormGroup>
                            <Label for="exampleCity">City</Label>
                            <Input type="text" name="city" id="exampleCity"/>
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                            <Label for="exampleState">State</Label>
                            <Input type="text" name="state" id="exampleState"/>
                            </FormGroup>
                        </Col>
                        <Col md={2}>
                            <FormGroup>
                            <Label for="exampleZip">Zip</Label>
                            <Input type="text" name="zip" id="exampleZip"/>
                            </FormGroup>  
                        </Col>
                    </Row>
                </Card >

                <Card body outline color="info" style={styles.panel} >
                    <CardTitle>CREDIT CARD DETAIL</CardTitle>
                    <Row > 
                        <Col sm="12" md={{ size: 8, offset: 2 }}>
                            <Label for="cardholder" >Cardholder's Name</Label>
                            <Input type="text" id="cardholder" bsSize="sm"/>
                        </Col>
                    </Row>

                    <Row>  
                        <Col sm="12" md={{ size: 8, offset: 2 }} >
                            <p>Would you like to complete the purchase?</p>
                            <CardElement />
                            <p>* CVV or CVC is the card security code, unique three digits number on the back of your card separate from its number.</p>
                            <Button color="info" onClick={this.submit}>Place Order</Button>
                        </Col>
                    </Row>
                </Card>
            </FormGroup>
            <Scroll/>
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
    checkout:{  
        display:'inline',    
    },
    panel:{
        marginTop:'40px',
    }
  }

export default injectStripe(Payment);
