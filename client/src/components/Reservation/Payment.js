import React, {Component} from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import axios from 'axios';
import { Button } from 'mdbreact'
import { Form, FormGroup, Col, Row, Input, Label } from 'reactstrap';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import { Card, CardBody, CardTitle, MDBInput  } from 'mdbreact';
import classnames from 'classnames';
import { Carousel } from 'react-responsive-carousel';
import moment  from  'moment';

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
            startDate: {}, endDate: {},
            numGuests: 1,
            card: null,
            name: '',
            address: '', userCity: '', state: '', zip: '',
            cardholderName: '',
            subtotal: 0, total: 0, tax: 0, rewardsPoints: 0,
            activeTab: '1',
            usingRewards: true,
            special_accomodations: ''
        };
    }

    static getDerivedStateFromProps(props, state){
        let { hotel, rooms, city, startDate, endDate, numGuests, user } = props;
        if(props.hotel !== state.hotel && user !== null && user !== undefined){
            let addressSplit = props.user.address.split(',').map(v =>  v.charAt(0) === ' ' ? String(v).substr(1, v.length - 1) : v);

            return{
                ...state,
                hotel,
                rooms,
                city,
                startDate,
                endDate,
                numGuests,
                user,
                name: user.name.length ?
                    user.name.split(' ')
                        .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                        .join(' ') : '',
                address: addressSplit.length ? addressSplit[0] : '',
                userCity: addressSplit.length > 1 ? addressSplit[1] : '',
                state: addressSplit.length > 2 ? addressSplit[2] : '',
                zip: addressSplit.length > 3 ? addressSplit[3] : '',
            };
        } else if (props.hotel !== state.hotel && (user === null || user !== undefined)){
            return {
                ...state,
                hotel,
                rooms,
                city,
                startDate,
                endDate,
                numGuests,
                user
            }
        } else {
            return null;
        }
    }

    handleSubmit = async () => {
        let {
            hotel, city, startDate, endDate, numGuests,
            name,
            address, userCity, state, zip,
            cardholderName,
            subtotal, total, tax, rewardsPoints,
            usingRewards,
            special_accomodations
        } = this.state;

        if (!usingRewards) {
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
                    console.log(res);
                    axios.post('http://localhost:3001/reservations/create', {
                        hotel_id: hotel._id,
                        start_date: startDate.valueOf(),
                        end_date: endDate.valueOf(),
                        number_of_guests: numGuests,
                        user: {
                            name,
                            email: this.state.user.email,
                            id: this.state.user.id || this.state.user._id,
                            phoneNumber: this.state.user.phoneNumber
                        },
                        rewardsPoints,
                        subtotal, total, tax,
                        charge: res.data.charge,
                        usingRewards,
                        city: hotel.address.city,
                        hotel_name: hotel.name,
                        special_accomodations,
                        hotel_image: hotel.images[0]
                    })
                        .then(() => {
                            this.props.jumpToStep(3);
                        })
                        .catch(err => {
                            console.log(Object.keys(err));
                            console.log(err);
                        });
                })
                .catch(err => {
                    console.log(Object.keys(err));
                    console.log(err);
                });
        } else {
            axios.post('http://localhost:3001/reservations/create', {
                hotel_id: hotel._id,
                start_date: startDate.valueOf(),
                end_date: endDate.valueOf(),
                number_of_guests: numGuests,
                user: {
                    name,
                    email: this.state.user.email,
                    id: this.state.user.id || this.state.user._id
                },
                rewardsPoints,
                subtotal, total, tax,
                charge: {},
                usingRewards,
                city, hotel_name: hotel.name,
                special_accomodations,
                hotel_image: hotel.images[0]
            })
                .then(() => {
                    console.log('sucessful')
                    this.props.jumpToStep(3);
                })
                .catch(err => {
                    console.log(Object.keys(err));
                    console.log(err);
                });
        }

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

        duration = Math.round(Math.abs((this.state.startDate.valueOf() - this.state.endDate.valueOf()) / day));

        Object.keys(this.state.rooms).map((v,i) => {
            subtotal += this.state.rooms[v] * this.state.hotel.price[v];
        });

        subtotal *= duration;

        return subtotal;
    }

    calculateTax = () => Number(this.calculateSubtotal() * 0.0925).toFixed(2);
    calculateTotal = () => Number(parseFloat(this.calculateSubtotal()) + parseFloat(this.calculateTax())).toFixed(2);
    calculateRewardsPoints = () => Math.floor(Number(this.calculateSubtotal() * .1))

    toggle(tab) {
        if (this.state.activeTab !== tab) {
          this.setState({
            activeTab: tab
          });
        }
      }


    render() {
        return(
            <Form className="container" style={styles.body}>
                <Row>
                    <div className="form-control col-sm-12" style={{ marginTop: '2em' }}>
                        <CardTitle>RESERVATION DETAILS</CardTitle>
                        <Row className="text-right">
                            <Col s="3">
                            {
                                this.state.hotel.images && this.state.hotel.room_images
                                ?   <img src={this.state.hotel.images[0]} alt="" className="w-100"/>
                                : null
                            }
                            <br/>
                            </Col>
                            <Col s="9">
                                <b style={{fontSize:22}}>{this.state.hotel.name} of {this.state.hotel.address.city}</b>
                                <br/><br/>
                                <p>
                                    {this.state.hotel.stars === 5? <div> <i class="fas fa-star"></i> <i class="fas fa-star"></i> <i class="fas fa-star"></i> <i class="fas fa-star"></i> </div>: ""}
                                    {this.state.hotel.stars === 4? <div><i class="fas fa-star"></i> <i class="fas fa-star"></i> <i class="fas fa-star"></i> <i class="fas fa-star"></i> </div>: ""}
                                    {this.state.hotel.stars === 3? <div><i class="fas fa-star"></i> <i class="fas fa-star"></i> <i class="fas fa-star"></i>  </div> : ""}
                                    {this.state.hotel.stars === 2? <div><i class="fas fa-star"></i> <i class="fas fa-star"></i> </div>: ""}
                                    {this.state.hotel.stars === 1? <i class="fas fa-star"></i> : ""}
                                </p>
                                <p>{this.state.hotel.amenities.wifi? <i class="fas fa-wifi"></i> : ""}
                                {this.state.hotel.amenities.gym? <i class="fas fa-dumbbell" style={{marginLeft: "14px", color: '#484848'}}></i> : ""}
                                {this.state.hotel.amenities.pool?  <i class="fas fa-swimmer" style={{marginLeft: "14px", color: '#484848'}}></i> : ""}
                                {this.state.hotel.amenities.complimentary_breakfast? <i class="fas fa-utensils" style={{marginLeft: "14px", color: '#484848'}}></i>  : ""}
                                {this.state.hotel.amenities.coffee? <i class="fas fa-coffee" style={{marginLeft: "14px", color: '#484848'}}></i> : ""}
                                {this.state.hotel.amenities.laundry? <i class="fas fa-tshirt" style={{marginLeft: "14px", color: '#484848'}}></i>  : ""}
                                {this.state.hotel.amenities.free_parking? <i class="fas fa-car" style={{marginLeft: "14px", color: '#484848'}}></i> : ""}</p>
                                <br/>
                                <p>
                                    <b>Booked from:</b> <br/>{moment(this.state.startDate).format('MM DD YYYY').split(' ').join('/')} to {moment(this.state.endDate).format('MM DD YYYY').split(' ').join('/')}
                                </p>
                                <p> <b>Rooms Booked:</b> <br/>
                                {
                                    Object.keys(this.state.rooms).map((v,i) => {
                                        return <p>{this.state.rooms[v]} {String(v).replace(/\w\S*/g, words => words.charAt(0).toUpperCase() + words.substr(1).toLowerCase()) + ` Bed Room${this.state.rooms[v] > 1 ? 's' : ''}`} for ${this.state.hotel.price[v]} {this.state.rooms[v] > 1 ? 'each' : ''}</p>
                                    })
                                }
                                </p>
                            </Col>
                        </Row>
                    </div>

                    <div className="form-control col-sm-12" style={{ marginTop: '2em' }}>
                        <CardTitle>BILLING ADDRESS</CardTitle>
                        <Row>
                            <Col sm="12">
                                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                    <Label for="exampleDate">Full Name </Label>
                                    <Input name="name" value={this.state.name} onChange={this.handleChange} placeholder="Jane Fonda" />
                                </FormGroup>
                            </Col>
                            <Col sm="12">
                                <FormGroup>
                                    <Label for="exampleAddress">Address</Label>
                                    <Input onChange={this.handleChange} value={this.state.address} type="text" name="address" id="exampleAddress" placeholder="1234 Main St"/>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
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
                                <Label for="exampleZip">Zip Code</Label>
                                <Input onChange={this.handleChange} value={this.state.zip} type="text" name="zip" placeholder="12345" id="exampleZip"/>
                                </FormGroup>
                            </Col>
                        </Row>
                    </div>

                    <div className="form-control col-sm-12" style={{ marginTop: '2em' }}>
                        <CardTitle>SPECIAL ACCOMMODATIONS</CardTitle>
                        <CardBody>
                            <Input type="textarea" onChange={this.handleChange} value={this.state.special_accomodations} name="special_accomodations" placeholder="If you need any special accommodations in place that the hotel could provide for you, let them know here."/>
                        </CardBody>
                    </div>

                    <div className="form-control col-sm-12" style={{ marginTop: '2em', marginBottom: '2em' }}>
                        <Nav tabs>
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: this.state.activeTab === '1' })}
                                    onClick={() => { this.toggle('1'); this.setState({ usingRewards: true })}}
                                >
                                    Rewards Points Checkout
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: this.state.activeTab === '2' })}
                                    onClick={() => { this.toggle('2'); this.setState({ usingRewards: false })}}
                                >
                                    Card Checkout
                                </NavLink>
                            </NavItem>
                            </Nav>
                            <TabContent activeTab={this.state.activeTab}>
                            <TabPane tabId="1">
                                <br/>
                                <Row>
                                    <Col sm="12">
                                        {this.state.user.rewardsPoints > this.state.total ?
                                            <div>
                                                <h3>Congratulations!</h3>
                                                <p>You have enough rewards points for a free stay!</p>
                                                
                                                <Row>
                                                    <Col sm="12" className="text-center">
                                                        <b>Subtotal: </b>${this.state.subtotal}<br/>
                                                        <b>Tax: </b>${this.state.tax}<br/>
                                                        <b>Total: </b>${this.state.total}<br/><br/>
                                                        
                                                        <b>Rewards Points Balance: </b>{this.state.user.rewardsPoints}<br/>
                                                        <b>Rewards Points Needed: </b>{Math.floor(this.state.subtotal)}<br/>
                                                        <b>Rewards Points Balance After: </b>{Math.floor(this.state.user.rewardsPoints - this.state.subtotal)}
                                                        <hr/>
                                                    </Col>
                                                </Row>
                                                <Button color="info" onClick={this.handleSubmit}>Get My Free Stay</Button>
                                            </div> :
                                            <div>
                                                <h5>Oh no!</h5>
                                                <p>You need {Math.floor(this.state.subtotal)} reward points to get a free stay</p>
                                                <p>But you only have {this.state.user.rewardsPoints} reward points in your balance</p>
                                                <p>You can still check out with your credit/debit card :)</p>
                                                <Button onClick={
                                                    () => {
                                                        this.toggle('2');
                                                        this.setState({ usingRewards: false
                                                        })}}>
                                                    Checkout with Card</Button>
                                            </div>
                                        }
                                    </Col>
                                </Row>
                            </TabPane>
                            <TabPane className="text-center" tabId="2">
                                <br/>
                                <h3>Card Checkout</h3>
                                <br/>
                                <Row >
                                    <Col sm="12" className="text-center">
                                        <b>Subtotal: </b>${this.state.subtotal}<br/>
                                        <b>Tax: </b>${this.state.tax}<br/>
                                        <b>Total: </b>${this.state.total}<br/><br/>
                                        <b>Rewards Points Balance Currently: </b> {this.state.user.rewardsPoints}<br/>
                                        <b>Rewards Points Earned: </b> {this.state.rewardsPoints}<br/>
                                        <b>Rewards Points Balance After: {this.state.user.rewardsPoints + this.state.rewardsPoints}</b>
                                        
                                    </Col>
                                    <Col className="text-center" sm="12" md={{ size: 4, offset: 4 }}>
                                        <hr/>
                                        <Input onChange={this.handleChange} value={this.state.cardholderName} type="text" id="cardholder" name="cardholderName" placeholder="Cardholder's Name" style={{boxShadow: 'rgba(50, 50, 93, 0.14902) 0px 1px 3px, rgba(0, 0, 0, 0.0196078) 0px 1px 0px',
                                        borderRadius: '4px', padding: '10px 14px', fontSize: '16px', marginRight: '14px'}}/>
                                    </Col>
                                    <Col className="text-center" sm="12" md={{ size: 4, offset: 4 }} >

                                        <CardElement style={styles.cardpanel}/>

                                        <p style={styles.cardinfo}>* CVV or CVC is the card security code, unique three digits number on the back of your card separate from its number.</p>
                                        <Button color="info" onClick={this.handleSubmit}>Finish Checkout</Button>
                                    </Col>
                                </Row>
                            </TabPane>
                        </TabContent>
                    </div>
                </Row>
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
      startDate: state.reservation.startDateMoment,
      endDate: state.reservation.endDateMoment,
      numGuests: state.reservation.numGuests
  };
}

export default injectStripe(connect(mapStatetoProps, {payment})(Payment));
