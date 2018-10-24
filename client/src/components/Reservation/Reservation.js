import React, {Component} from 'react';
import Stepper from './Stepper';
import '../css/Home.css';
import { Button, Form, FormGroup, Label, Container, Input, Row, Col } from 'reactstrap';
import Scroll from '../ScrollUp';


export default class Reservation extends Component{
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
                            <Input className="location" placeholder="Location"/> 
                            {/* replace placeholder = "Location" with the current city that was chosen*/}
                        </FormGroup>
                    </Col>
                    <Col xs="6" sm="6" lg="2">
                        <FormGroup >
                            <Label className="edit-label" for="exampleDate"> Guests:  </Label>
                            <Input type="select" name="select" id="exampleSelect" placeholder="sm">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col xs="6" sm="6" lg="3">
                        <FormGroup>
                            <Label className="edit-label" for="exampleDate"> Check In:</Label>
                            <Input type="date" name="date" id="exampleDate" placeholder="date placeholder" />
                        </FormGroup>
                    </Col>
                    <Col xs="6" sm="6" lg="3">
                        <FormGroup>
                            <Label className="edit-label" for="exampleDate"> Check Out:</Label>
                            <Input type="date" name="date" id="exampleDate" placeholder="date placeholder" />
                        </FormGroup>
                    </Col>
                    <Col style={styles.updateButton} xs="12" sm="12" lg="2">
                        <Button href="/reservation">Update Search</Button>
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
      paddingTop: '200px',
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
    
  }