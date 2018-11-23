import React, { Component } from 'react';
import {Input, Container } from 'reactstrap';
import {Button, Row, Col} from 'mdbreact'
import {search} from '../../actions/';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker} from 'react-dates';
import moment from 'moment';
import PlacesAutocomplete from 'react-places-autocomplete';
import {
    geocodeByAddress,
    geocodeByPlaceId,
    getLatLng,
  } from 'react-places-autocomplete';

class SearchForm extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            changingText: 'life.',
            city: '',
            startDate: '',
            endDate: '',
            numGuests: 1,
            submitted: false
        };

        this.textArray = ['life.', 'work.', 'stress.'];
        this.interval = null;
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
    
   onSubmit = event => {
        event.preventDefault();
        let { city, startDate, endDate, numGuests } = this.state;

        let citySplit = city.split(',');

        // take only the first slice before comma, only submit city name
        if (citySplit.length > 1)
            city = citySplit[0];

        let startD = moment(this.state.startDate).format('L');
        let endD = moment(this.state.endDate).format('L');

        let sdSplit = startD.split('/');
        let edSplit = endD.split('/');
        
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
        this.setState({ submitted: true });
   }

    componentDidMount() {
        var i = 0;
        this.interval = setInterval(() => {
            this.setState({ changingText: this.textArray[i++] });
            if (i === this.textArray.length)
                i = 0;
        }, 1500)
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        if (this.state.submitted)
            return( <Redirect to='/reservation' /> );
        else
            return(
                <Container className="text-block">
                    <br/>
                    <h2 className="title"> Take a break from {this.state.changingText}</h2>
                    <br/>
                    <form className="form-wrapper" onSubmit={this.onSubmit}>
                        <Row>
                            <Col sm="12">
                                {/* <Input value={this.state.city} onChange={this.handleChange} type='text' name="city" id='search-place-auto' className="search-place" bsSize="lg" placeholder="Where do you want to go?" require />
                            */}
                                <PlacesAutocomplete
                                    value={this.state.city}
                                    onChange={this.handleChangeAuto}
                                    onSelect={this.handleSelectAuto}
                                    style={styles.searchField}
                                >
                                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                        <div>
                                            <input
                                                {...getInputProps({
                                                placeholder: 'Search Places ...',
                                                className: 'location-search-input',
                                                })}
                                                className="form-control text-center col-sm-8 offset-sm-2"
                                                style={{ height: '3em' }}
                                            />
                                            <div className="autocomplete-dropdown-container">
                                                {loading && <div>Loading...</div>}
                                                {Array.prototype.slice.call(suggestions,0,1).map(suggestion => {
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
                                                                <span onClick={()=>this.setState({ city: suggestion.description })}>{suggestion.description}</span>
                                                            </div>
                                                        );
                                                })}
                                            </div>
                                        </div>
                                    )}
                                </PlacesAutocomplete>
                            </Col>
                        </Row>
                        
                        <Row className="search-date">
                            {/* <Col xs="6" sm="4">
                            
                                    <Label for="exampleDate"> Check In:  </Label>
                                    <Input value={this.state.startDate} onChange={this.handleChange} type="date" name="startDate" id="exampleDate" placeholder="date placeholder" />
                            
                            </Col>

                            <Col xs="6" sm="4">
                            
                                    <Label for="exampleDate"> Check Out:  </Label>
                                    <Input value={this.state.endDate} onChange={this.handleChange} type="date" name="endDate" id="exampleDate" placeholder="date placeholder" />
                        
                            </Col> */}
                            <Col sm="12">
                                <DateRangePicker
                                    withPortal={true}
                                    startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                                    endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                                    onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
                                    focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                                    onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
                                    required={true}
                                    startDatePlaceholderText= "Check In"
                                    endDatePlaceholderText= "Check Out"
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col sm="6">
                                <h4 className="text-white text-right" style={{ margin: '60px 0px 0px 0px'}}>
                                    Number of Guests:
                                </h4>
                            </Col>
                            <Col sm="6" className="text-left">
                                <Input value={this.state.numGuests} className='guestPicker' onChange={this.handleChange} name="numGuests" type="select" id="exampleSelect">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Input>
                            </Col>
                        </Row>

                        <Button type="submit" className="search-button">Search</Button>
                    </form>
                    
                </Container>
        );
    }
}

const styles ={
    searchField:{
        position: 'relative',
        textAlign: 'center',
        height:'1000px',
        weight:'10000px',
        width: '100%'
    }
}

export default connect (null, { search })(SearchForm);