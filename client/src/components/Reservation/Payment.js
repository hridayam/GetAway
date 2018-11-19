import React, {Component} from 'react';
import {CardElement, CardNumberElement, CardExpiryElement, CardCvcElement, injectStripe} from 'react-stripe-elements';
import axios from 'axios';
import {Button, Form, FormGroup, Col, Row, Input, Label, Card, CardTitle} from 'reactstrap';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';

import Scroll from '../ScrollUp';
import '../css/Home.css';
import {connect} from 'react-redux';
import {payment} from '../../actions/payment';

class Payment extends Component{
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            complete: false,
            hotel: null,
            rooms: null,
            city: '',
            startDate: 0, endDate: 0,
            numGuests: 0,
            card: null,
            firstName: '', lastName: '',
            address: '', userCity: '', state: '', zip: '',
            cardholderName: '',
            subtotal: 0, total: 0, tax: 0, rewardsPoints: 0,
            activeTab: '1'
        };
    }

    static getDerivedStateFromProps(props, state){
        let { hotel, rooms, city, startDate, endDate, numGuests, user } = props; 
        if(props.hotel !== state.hotel){
            return{
                ...state,
                hotel,
                rooms,
                city,
                startDate,
                endDate,
                numGuests,
                user
            };
        }
        return null;
    }

    handleSubmit = async () => {
        let { 
            hotel, city, startDate, endDate, numGuests, 
            firstName, lastName,
            address, userCity, state, zip,
            cardholderName,
            subtotal, total, tax, rewardsPoints
        } = this.state;

        let {token} = await this.props.stripe.createToken({name: this.state.cardholderName});

        let data = {
            amount: parseInt(this.calculateTotal()),
            currency: 'usd',
            source: token.id,
            description: this.state.user.id
        };

        // Nhat switched back to old promise handling for testing
        axios.post('http://localhost:3001/payments/pay', {data})
            .then(res => {
                axios.post('http://localhost:3001/reservations/create', {
                    hotel_id: hotel._id, 
                    start_date: startDate, 
                    end_date: endDate, 
                    number_of_guests: numGuests, 
                    user: {
                        name: `${firstName} ${lastName}`,
                        email: this.state.user.email,
                        id: this.state.user.id
                    },
                    rewardsPoints,
                    subtotal, total, tax,
                    charge: res.data.charge,
                    
                })
                    .then(() => {
                        this.props.jumpToStep(3);
                    })
                    .catch(err => {
                        console.log(err);
                    });
            })
            .catch(err => {
                console.log(err);
            })
            
        
        this.setState({complete: true});
    }

    componentDidMount() {
        // calculate all prices on window load
        this.setState({
            subtotal: this.calculateSubtotal(),
            total: this.calculateTotal(),
            tax: this.calculateTax(),
            rewardsPoints: this.calculateRewardsPoints()
        });
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    calculateSubtotal = () => {
        let subtotal = 0;
        let duration = 0;
        let day = 24*60*60*1000;

        duration = Math.round(Math.abs((this.state.startDate - this.state.endDate) / day));

        Object.keys(this.state.rooms).map((v,i) => {
            subtotal += this.state.rooms[v] * this.state.hotel.price[v];
        });

        subtotal *= duration;

        return subtotal;
    }

    calculateTax = () => Number(this.calculateSubtotal() * 0.0925).toFixed(2);
    calculateTotal = () => Number(parseFloat(this.calculateSubtotal()) + parseFloat(this.calculateTax())).toFixed(2);
    calculateRewardsPoints = () => Math.floor(Number(this.calculateTotal() * .1))

    toggle(tab) {
        if (this.state.activeTab !== tab) {
          this.setState({
            activeTab: tab
          });
        }
      }

    render(){
        if (this.state.complete) return <h1>Purchase Complete</h1>;

        return(
            <Form style = {styles.body}>
                <FormGroup >
                    <h2 >Checkout</h2>
                    <Card body outline color="info" style={styles.panel} >
                        <CardTitle>REVIEW ORDER</CardTitle>
                        <Row className="text-right">
                            <Col s="3">
                                {this.state.hotel.images[0] ? <img src={this.state.hotel.images[0]} alt="" style={{width:350}}/> : <div><br/><br/>No Images Available</div>}
                            </Col>
                            <Col s="9">
                                <b style={{fontSize:20}}>{this.state.hotel.name}</b>
                                <br/>
                                <small>{this.state.hotel.city}, {this.state.hotel.state}</small>
                                <br/><br/>
                                Subtotal: ${this.state.subtotal}
                                <br/>
                                Tax: ${this.state.tax}
                                <br/><br/>
                                Total: ${this.state.total}
                                <br/>
                                Rewards Points Earned: {this.state.rewardsPoints}
                            </Col>
                        </Row>
                    </Card>

                    <Card body outline color="info" style={styles.panel}>
                        <CardTitle>BILLING ADDRESS</CardTitle>
                        <Row>
                            <Col >
                                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                    <Label for="exampleDate"> First Name:  </Label>
                                    <Input name="firstName" value={this.state.firstName} onChange={this.handleChange} placeholder="Enter your first name" />
                                </FormGroup>
                            </Col>

                            <Col >
                                <FormGroup inline className="mb-2 mr-sm-2 mb-sm-0">
                                    <Label for="exampleDate"> Last Name:  </Label>
                                    <Input name="lastName" onChange={this.handleChange} value={this.state.lastName} placeholder="Enter your last name" />
                                </FormGroup>
                            </Col>
                        </Row>

                        <FormGroup>
                            <Label for="exampleAddress">Address</Label>
                            <Input onChange={this.handleChange} value={this.state.address} type="text" name="address" id="exampleAddress" placeholder="1234 Main St"/>
                        </FormGroup>

                        <Row form>
                            <Col md={6}>
                                <FormGroup>
                                <Label for="exampleCity">City</Label>
                                <Input onChange={this.handleChange} value={this.state.userCity} type="text" name="userCity" placeholder="Cityville" id="exampleCity"/>
                                </FormGroup>
                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                <Label for="exampleState">State</Label>
                                <Input onChange={this.handleChange} value={this.state.state} type="text" name="state" placeholder="California" id="exampleState"/>
                                </FormGroup>
                            </Col>
                            <Col md={2}>
                                <FormGroup>
                                <Label for="exampleZip">Zip</Label>
                                <Input onChange={this.handleChange} value={this.state.zip} name="zip" type="text" name="zip" placeholder="28374" id="exampleZip"/>
                                </FormGroup>
                            </Col>
                        </Row>
                    </Card >

                    <Card body outline color="info" style={styles.panel} >
                        <Nav tabs>
                            <NavItem>
                                <NavLink
                                className={classnames({ active: this.state.activeTab === '1' })}
                                onClick={() => { this.toggle('1'); }}
                                >
                                    Rewards Points Checkout
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                className={classnames({ active: this.state.activeTab === '2' })}
                                onClick={() => { this.toggle('2'); }}
                                >
                                    Credit Card Checkout
                                </NavLink>
                            </NavItem>
                            </Nav>
                            <TabContent activeTab={this.state.activeTab}>
                            <TabPane tabId="1">
                                <br/>
                                <Row>
                                    <Col sm="12">
                                        <h4>Tab 1 Contents</h4>
                                    </Col>
                                </Row>
                            </TabPane>
                            <TabPane tabId="2">
                                <br/>
                                <Row >
                                    <Col sm="12" md={{ size: 8, offset: 2 }}>

                                        <Input onChange={this.handleChange} value={this.state.cardholderName} type="text" id="cardholder" name="cardholderName" bsSize="sm" placeholder="Cardholder's Name" style={{boxShadow: 'rgba(50, 50, 93, 0.14902) 0px 1px 3px, rgba(0, 0, 0, 0.0196078) 0px 1px 0px',
                                        borderRadius: '4px', padding: '10px 14px', fontSize: '16px'}}/>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col sm="12" md={{ size: 8, offset: 2 }} >

                                        <CardElement style={styles.cardpanel}/>

                                        <p style={styles.cardinfo}>* CVV or CVC is the card security code, unique three digits number on the back of your card separate from its number.</p>
                                        <Button color="info" onClick={this.handleSubmit}>Place Order</Button>
                                    </Col>
                                </Row>
                            </TabPane>
                        </TabContent>
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
        iconColor: 'black',
        color: 'black'
      }
    }
  }


const mapStatetoProps = state => {
  return {
      user: state.auth.user,
      hotel: state.reservation.selectedHotel,
      rooms: state.reservation.selectedRooms,
      city: state.reservation.city,
      startDate: state.reservation.startDate,
      endDate: state.reservation.endDate,
      numGuests: state.reservation.numGuests
  };
}

export default injectStripe(connect(mapStatetoProps, {payment})(Payment));
