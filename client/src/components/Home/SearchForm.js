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
    getLatLng,
  } from 'react-places-autocomplete';

class SearchForm extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            changingText: 'life.',
            city: '',
            startDate: new moment(),
            endDate: new moment(),
            numGuests: 1,
            submitted: false,
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
        let { city, numGuests } = this.state;

        let citySplit = city.split(',');

        // take only the first slice before comma, only submit city name

        if (citySplit.length > 1 && citySplit.length < 4){
            city = citySplit[0];
        } else if (citySplit.length > 3){
            city = citySplit[citySplit.length - 3].trim();
        }


        this.props.search(
            city,
            numGuests,
            this.state.startDate,
            this.state.endDate);
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
        console.log(this.state);
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

                                                required
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

                                    startDateId="startDateId"
                                    endDateId="endDateId"

                                />
                            </Col>
                        </Row>
                        <Row>

                            <Col className="offset-sm-2" sm="4" style={{ marginTop: '-20px'}}>
                                <Row>
                                    <Col sm="6" className="offset-sm-1">
                                        <div className="text-white text-center" style={{ margin: '3em 0px 0px 0px'}}>
                                            <h4>Number of Guests:</h4>
                                        </div>
                                    </Col>
                                    <Col sm="5">
                                        <Input value={this.state.numGuests} className='guestPicker' onChange={this.handleChange} name="numGuests" type="select" id="exampleSelect">
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
                                    </Col>
                                </Row>
                            </Col>
                            <Col sm="4" className="offset-sm-1 text-right">
                                <Button type="submit" className="search-button">Search</Button>

                            </Col>
                        </Row>
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
