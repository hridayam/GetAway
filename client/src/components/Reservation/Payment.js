import React, {Component} from 'react';
import {CardElement, CardNumberElement, CardExpiryElement, CardCvcElement, injectStripe} from 'react-stripe-elements';
import axios from 'axios';
import {Button, Form, FormGroup, Col, Row, Input, Label, Card, CardTitle} from 'reactstrap';
import Scroll from '../ScrollUp';
import '../css/Home.css';
import {connect} from 'react-redux';
import {payment} from '../../actions/payment';

class Payment extends Component{
    constructor(props) {
        super(props);
        this.state = {
            complete: false,
            hotel: null,
            rooms: null,
            price: 0
        };

        this.submit = this.submit.bind(this);
    }

    static getDerivedStateFromProps(props, state){
        if(props.hotel !== state.hotel){
            console.log(props);
            return{
                ...state,
                hotel: props.hotel,
                rooms: props.rooms
            }
        }
        return null;
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
                                {this.state.hotel.images[0] ? <img src={this.state.hotel.images[0]} alt="" style={{width:500}}/> : <div><br/><br/>No Images Available</div>}
                            </Col>
                            <Col xs="auto">
                                <h3>{this.state.hotel.name}</h3>
                                <h4>{this.state.hotel.city}</h4>
                            </Col>
                            <Col xs="3">
                                <b>Price: </b>{r.beds*this.state.hotel.price[r.bed_type]}
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

                                <Input type="text" id="cardholder" bsSize="sm" placeholder="Cardholder's Name" style={{boxShadow: 'rgba(50, 50, 93, 0.14902) 0px 1px 3px, rgba(0, 0, 0, 0.0196078) 0px 1px 0px',
                                borderRadius: '4px', padding: '10px 14px', fontSize: '16px'}}/>
                            </Col>
                        </Row>

                        <Row>
                            <Col sm="12" md={{ size: 8, offset: 2 }} >

                                <CardElement style={styles.cardpanel}/>

                                <p style={styles.cardinfo}>* CVV or CVC is the card security code, unique three digits number on the back of your card separate from its number.</p>
                                <Button color="info" onClick={this.submit = () => this.props.jumpToStep(3)}>Place Order</Button>
                            </Col>
                        </Row>
                    </Card>
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
    checkout:{
        display:'inline',
    },
    panel:{
        marginTop:'40px',
    },
    cardinfo:{
        fontSize : '12px',
        fontFamily: 'Montserrat'
    },
    cardpanel:{
        base:{
        fontSize: '16px',
        fontFamily: 'Montserrat',
        iconColor: 'blue',
        color: 'red'

      }
    }

  }


const mapStatetoProps = state => {
  return {
      hotel: state.reservation.selectedHotel,
      rooms: state.reservation.selectedRooms
  };
}

export default injectStripe(connect(mapStatetoProps, {payment})(Payment));
