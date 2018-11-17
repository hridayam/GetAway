import React, {Component} from 'react';
import Stepper from './Stepper';
import '../css/Home.css';
import { Button, Form, FormGroup, Label, Container, Input, Row, Col } from 'reactstrap';
import Scroll from '../ScrollUp';
import ReactWeather from 'react-open-weather';
//Optional include of the default css styles 
import 'react-open-weather/lib/css/ReactWeather.css';
import { connect } from 'react-redux';
import { search } from '../../actions/';

class Reservation extends Component{
    constructor(props) {
        super(props);
        this.state = {
            city: '',
            startDate: '',
            endDate: '',
            numGuests: 1,
            reservation: {}
        };
    }

    static getDerivedStateFromProps(props,state) {
        if (props.reservation !== state.reservation) {
            let { city, startDateStr, endDateStr, numGuests } = props.reservation;
            return {
                reservation: props.reservation,
                city: city
                        .toLowerCase()
                        .replace(
                            /\b[a-z](?=[a-z]{2})/g, 
                            letter => letter.toUpperCase()),
                startDate: startDateStr,
                endDate: endDateStr,
                numGuests,
            };
        }
        return null;
    }

    handleChange = event => {
        let { name, value } = event.target;
        this.setState({ [name]: value });

    }

    handleSubmit = () => {
        let { city, startDate, endDate, numGuests } = this.state;
        if (startDate.length && endDate.length) {
            let sdSplit = startDate.split('-');
            let edSplit = endDate.split('-');

            let sdDate = new Date(
                            sdSplit[0], 
                            sdSplit[1], 
                            sdSplit[2],
                            0, 0, 0, 0);
            let edDate = new Date(
                            edSplit[0],
                            edSplit[1],
                            edSplit[2],
                            0, 0, 0, 0);
            
            this.props.search(
                city, 
                sdDate.getTime(), 
                edDate.getTime(), 
                numGuests,
                startDate,
                endDate);
        }

        else 
            this.props.search(
                city, 
                0, 
                0,
                0,
                0, 
                numGuests);
    }

    render(){
        return(
            <div>
            <Scroll/>
            <div className = 'reservation-img' style={ styles.homeStyle}></div>
            <div className="reservation-search-edit">
            <Container>
            <Form className="form-wrapper">
                <Row className="search-date reservation">
                    <Col xs="6" sm="6" lg="2">
                        <FormGroup>
                            <Label className="edit-label" for="exampleDate"> Location:  </Label>
                            <Input onChange={this.handleChange} name="city" value={this.state.city} className="location" placeholder="City Name"/> 
                        </FormGroup>
                    </Col>
                    <Col xs="6" sm="6" lg="2">
                        <FormGroup >
                            <Label className="edit-label" for="exampleDate"> Guests:  </Label>
                            <Input value={this.state.numGuests} onChange={this.handleChange} type="select" name="numGuests" id="exampleSelect" placeholder="sm">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                <option>6</option>
                                <option>7</option>
                                <option>8</option>
                                <option>9</option>
                                <option>10</option>
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col xs="6" sm="6" lg="3">
                        <FormGroup>
                            <Label className="edit-label" for="exampleDate"> Check In:</Label>
                            <Input value={this.state.startDate} onChange={this.handleChange} type="date" name="startDate" placeholder="date placeholder" />
                        </FormGroup>
                    </Col>
                    <Col xs="6" sm="6" lg="3">
                        <FormGroup>
                            <Label className="edit-label" for="exampleDate"> Check Out:</Label>
                            <Input value={this.state.endDate} onChange={this.handleChange} type="date" name="endDate" placeholder="date placeholder" />
                        </FormGroup>
                    </Col>
                    <Col style={styles.updateButton} xs="12" sm="12" lg="2">
                        <Button onClick={this.handleSubmit}>Update Search</Button>
                    </Col>
                </Row>
            </Form>
            </Container>
        </div>
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
      paddingTop: '300px'
    },
    updateButton: {
      fontFamily: 'Lato',
      color: 'white',
      textAlign: 'center',
      marginTop: '33.6px',
      height: '40px',
      alignItems: 'center',
      display: 'block'
    }
};

const mapStateToProps = state => {
    return {
        reservation: state.reservation
    };
};

export default connect(mapStateToProps, { search })(Reservation);