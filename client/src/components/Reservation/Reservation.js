import React, {Component} from 'react';
import Stepper from './Stepper';
import '../css/Home.css';
import { Button, Form, FormGroup, Label, Container, Input, Row, Col } from 'reactstrap';
import Scroll from '../ScrollUp';
import { DateRangePicker} from 'react-dates';
import { connect } from 'react-redux';
import { search } from '../../actions/';
import PlacesAutocomplete from 'react-places-autocomplete';
import {
    geocodeByAddress,
    geocodeByPlaceId,
    getLatLng,
  } from 'react-places-autocomplete';
import moment from 'moment';


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

    handleChangeAuto = city => {
        this.setState({ city });
       };
    
       handleSelectAuto = city => {
        geocodeByAddress(city)
          .then(results => getLatLng(results[0]))
          .then(latLng => console.log('Success', latLng))
          .catch(error => console.error('Error', error));
    };


    // handleSubmit = () => {
    //     let { city, startDate, endDate, numGuests } = this.state;
    //     if (startDate.length && endDate.length) {
    //         let sdSplit = startDate.split('-');
    //         let edSplit = endDate.split('-');

    //         let sdDate = new Date(
    //                         sdSplit[0], 
    //                         sdSplit[1], 
    //                         sdSplit[2],
    //                         0, 0, 0, 0);
    //         let edDate = new Date(
    //                         edSplit[0],
    //                         edSplit[1],
    //                         edSplit[2],
    //                         0, 0, 0, 0);
            
    //         this.props.search(
    //             city, 
    //             sdDate.getTime(), 
    //             edDate.getTime(), 
    //             numGuests,
    //             startDate,
    //             endDate);
    //     }

    //     else 
    //         this.props.search(
    //             city, 
    //             0, 
    //             0,
    //             0,
    //             0, 
    //             numGuests);
    // }

    onSubmit = event => {
        event.preventDefault();
        let { city, numGuests } = this.state;

        let startD = moment(this.state.startDate).format('L');
        let endD = moment(this.state.endDate).format('L');

        let sdSplit = startD.split('/');
        let edSplit = endD.split('/');
        
        // let sdDate = new Date(
        //                 sdSplit[0], 
        //                 sdSplit[1], 
        //                 sdSplit[2], 
        //                 0, 0, 0, 0);
        // let edDate = new Date(
        //                 edSplit[0],
        //                 edSplit[1],
        //                 edSplit[2],
        //                 0, 0, 0, 0);
        
        let newStartDate = sdSplit[2] + "-" + sdSplit[0] + "-" + sdSplit[1];
        let newEndDate = edSplit[2] + "-" + edSplit[0] + "-" + edSplit[1];

        //getting only city
        let tempCity = city;

        let getCity = tempCity.split(',');

        let newCity = new String(
                        getCity[1]   
        )

        this.props.search(
            newCity, 
            //ask Nhat if we need it since we dont use it when we post to database
            // sdDate.getTime(), 
            // edDate.getTime(), 
            numGuests,
            newStartDate,
            newEndDate);
        this.setState({ submitted: true });
   }

    render(){
        return(
            <div>
            <Scroll/>
            <div className = 'reservation-img' style={styles.homeStyle}></div>
            <div className="reservation-search-edit">
            <Container>
            <Form className="form-wrapper" onSubmit={this.onSubmit}>
                <Row className="search-date reservation">
                    <Col xs="6" sm="6" lg="2">
                    <PlacesAutocomplete
                                value={this.state.city}
                                onChange={this.handleChangeAuto}
                                onSelect={this.handleSelectAuto}
                                style={styles.searchField}
                                searchOptions={{types:['address']}}
                            >
                                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                    <div>
                                        <input
                                            {...getInputProps({
                                            placeholder: this.state.city,
                                            className: 'location-search-input',
                                            })}
                                        />
                                        <div className="autocomplete-dropdown-container">
                                            {loading && <div>Loading...</div>}
                                            {suggestions.map(suggestion => {
                                                const className = suggestion.active
                                                    ? 'suggestion-item--active'
                                                    : 'suggestion-item';
                                                    // inline style for demonstration purpose
                                                const style = suggestion.active
                                                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                                    return (
                                                        <div
                                                            {...getSuggestionItemProps(suggestion, {
                                                                className,
                                                                style,
                                                            })}
                                                        >
                                                            <span>{suggestion.description}</span>
                                                        </div>
                                                    );
                                            })}
                                        </div>
                                    </div>
                                )}
                            </PlacesAutocomplete>
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
                    <Col sm="12">
                            <DateRangePicker
                                 withPortal={true}
                                 startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                                 endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                                 onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
                                 focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                                 onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
                                 required={true}
                                 startDatePlaceholderText= {this.state.startDate}
                                 endDatePlaceholderText= {this.state.endDate}
                            />
                    </Col>
                    <Col style={styles.updateButton} xs="12" sm="12" lg="2">
                        <Button type='submit'>Update Search</Button>
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