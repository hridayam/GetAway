import React, { Component } from 'react';
import { Input, Col, Row, Container } from "mdbreact";
import {search} from '../../actions/';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';
import '../css/Home.css';


class SearchForm extends Component {
    constructor(props) {
        super(props);
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
    
   onSubmit = event => {
        event.preventDefault();
        let { city, startDate, endDate, numGuests } = this.state;

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
            <div>
                <Container style={styles.textBlock}>
                <br/>
                <h2 className="title"> Take a break from {this.state.changingText}</h2>
                <br/>
                </Container>
                <div></div>

                <Container style={styles.searchField}>
                <form className="form-wrapper" onSubmit={this.onSubmit}>
                    <Row>
                        <Col sm="12">
                                {/* <Input style={{color: 'black'}}
                                hint="Search"
                                value={this.state.city} 
                                onChange={this.handleChange} 
                                name="city" className="search-place" bsSize="lg" 
                                placeholder="Where do you want to go?" /> */}
                                <Input style={styles.searchPlace}
                                    hint="Where do you want to go?"
                                    type="text"
                                    value={this.state.city} 
                                    onChange={this.handleChange} 
                                    name="city"
                                    containerClass="active-pink active-pink-2 mt-0 mb-3"/>
                                    
                        </Col>
                    </Row>
                    
                    <Row style={styles.searchDate} className="form-inline">
                        <Col >
                                <label class="control-label" for="date"> Check In:  </label>
                                <input  value={this.state.startDate} 
                                        onChange={this.handleChange} 
                                        type="date" name="startDate" 
                                        id="exampleDate" 
                                        placeholder="date placeholder" 
                                        />
                        </Col>

                        <Col>
                                <label for="exampleDate"> Check Out:  </label>
                                <input  value={this.state.endDate} 
                                        onChange={this.handleChange} 
                                        type="date" name="endDate" 
                                        id="exampleDate" 
                                        placeholder="date placeholder" />
                        </Col>
                        
                        <Col >
                       
                                <label> Guests:  </label>
                                <select value={this.state.numGuests} onChange={this.handleChange} name="numGuests" placeholder="sm">
                                    <option>Choose your option</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                </select>
                        </Col>

                        <Col>
                            <button className="btn btn-deep-orange login" type='submit'> Search</button>
                        </Col>
                    </Row>
                </form>
                </Container>
            </div>
        );
    }
}
const styles = {
    textBlock: {
        position: 'relative',
        backgroundColor: 'rgba(0,0,0,0.2)',
        textAlign: 'center'
    },
    searchField: {
        position: 'relative',
        backgroundColor: 'white',
        textAlign: 'center',
        marginTop: '130px'
    },
    searchDate: {
        fontFamily: 'Lato',
        color: 'black',
        textAlign: 'center',
        marginBottom:'10px', 
        marginTop: '-50px',    
      },
    searchPlace: {
        fontFamily: 'Lato',
        fontSize: '1em',
        color: 'black',
        textAlign: 'center',  
        display: 'inline-block',

    },

}

export default connect (null, { search })(SearchForm);