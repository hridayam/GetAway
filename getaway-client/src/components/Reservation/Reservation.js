import React, {Component} from 'react';
import Stepper from './Stepper';
import '../css/Home.css';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';


export default class Reservation extends Component{
    render(){
        return(
            <div>
            <div className = 'reservation-img' style={ styles.homeStyle}></div>
            <Container className="reservation-search-edit">
            <Form className="form-wrapper">
                <Row>
                    <Col sm="12">
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                            <Input className="search-place" bsSize="lg" placeholder="Where do you want to go?" />
                        </FormGroup>
                    </Col>
                </Row>
                
                <Row className="search-date">
                    <Col xs="6" sm="4">
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                            <Label for="exampleDate"> Depart:  </Label>
                            <Input type="date" name="date" id="exampleDate" placeholder="date placeholder" />
                        </FormGroup>
                    </Col>

                    <Col xs="6" sm="4">
                        <FormGroup inline className="mb-2 mr-sm-2 mb-sm-0">
                            <Label for="exampleDate"> Arrival:  </Label>
                            <Input type="date" name="date" id="exampleDate" placeholder="date placeholder" />
                        </FormGroup>
                    </Col>
                    
                    <Col sm="4">
                        <FormGroup inline className="mb-2 mr-sm-2 mb-sm-0">
                            <Label for="exampleDate"> Guests:  </Label>
                            <Input type="select" name="select" id="exampleSelect" placeholder="sm">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Input>
                        </FormGroup>
                    </Col>
                </Row>

                <Button className="search-button" href="/reservation">Update Search</Button>
            </Form>
        </Container>
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
      paddingTop: '200px',
    },

  }