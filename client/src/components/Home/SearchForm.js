import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';
import {search} from '../../actions/search';
import {connect} from 'react-redux';

class SearchForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            changingText: 'life.',
            city: '',
            startDate: 0,
            endDate: 0,
            numGuests: 0
        };

        this.textArray = ['life.', 'work.', 'stress.'];
        this.interval = null;
    }

   handleChange = event => {
    let { name, value } = event.target;
    this.setState({ [name]: value })
   } 
    
   onSubmit = event => {
    event.preventDefault();
    this.props.search(city, startDate, endDate, numGuests);
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
    return (
        <Container className="text-block">
            <br/>
            <h2 className="title"> Take a break from {this.state.changingText}</h2>
            <br/>
            <Form className="form-wrapper" onSubmit={this.onSubmit}>
                <Row>
                    <Col sm="12">
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                            <Input value={this.state.city} onChange={this.handleChange} name="city" className="search-place" bsSize="lg" placeholder="Where do you want to go?" />
                        </FormGroup>
                    </Col>
                </Row>
                
                <Row className="search-date">
                    <Col xs="6" sm="4">
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                            <Label for="exampleDate"> Check In:  </Label>
                            <Input value={this.state.startDate} onChange={this.handleChange} type="date" name="startDate" id="exampleDate" placeholder="date placeholder" />
                        </FormGroup>
                    </Col>

                    <Col xs="6" sm="4">
                        <FormGroup inline className="mb-2 mr-sm-2 mb-sm-0">
                            <Label for="exampleDate"> Check Out:  </Label>
                            <Input value={this.state.endDate} onChange={this.handleChange} type="date" name="endDate" id="exampleDate" placeholder="date placeholder" />
                        </FormGroup>
                    </Col>
                    
                    <Col sm="4">
                        <FormGroup inline className="mb-2 mr-sm-2 mb-sm-0">
                            <Label for="exampleDate"> Guests:  </Label>
                            <Input value={this.state.numGuests} onChange={this.handleChange} name="numGuests" type="select" id="exampleSelect" placeholder="sm">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Input>
                        </FormGroup>
                    </Col>
                </Row>

                <Button type="submit" className="search-button" href="/reservation">Search</Button>
            </Form>
        </Container>
    );
  }
}

export default connect (null, { search })(SearchForm);