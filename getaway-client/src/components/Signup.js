import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';


export default class SignUp extends Component{
  constructor(props){
    super(props);
    this.state={};
  }

  render(){
    return(
      <div>
        <div className= 'background-image ' style={ styles.homeStyle }>
        <Container style={ styles.signUp }>
            <h1> Registration </h1>
            <Form>
                <Row>
                     <Col >
                        <FormGroup inline className="mb-2 mr-sm-2 mb-sm-0">
                            <Label> Email: </Label>
                            <Input placeholder="Enter your email"/>
                        </FormGroup>
                    </Col>

                    <Col >
                        <FormGroup inline className="mb-2 mr-sm-2 mb-sm-0">
                            <Label>Password:  </Label>
                            <Input placeholder="Enter your password"/>
                        </FormGroup>
                    </Col>
                </Row>

                <Row>
                     <Col >
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                            <Label for="exampleDate"> First Name:  </Label>
                            <Input  placeholder="Enter your first name" />
                        </FormGroup>
                    </Col>

                    <Col >
                        <FormGroup inline className="mb-2 mr-sm-2 mb-sm-0">
                            <Label for="exampleDate"> Last Name:  </Label>
                            <Input placeholder="Enter your last name" />
                        </FormGroup>
                    </Col>
                </Row>
                
                <Row>
                    <Col>
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                            <Label> Address:  </Label>
                            <Input placeholder="Address"/>
                        </FormGroup>
                    </Col>
                </Row>

                <Row>
                    <Col xs="6" sm="4">
                        <FormGroup inline className="mb-2 mr-sm-2 mb-sm-0">
                            <Label> City:  </Label>
                            <Input placeholder="City"/>
                        </FormGroup>
                    </Col>
                    <Col xs="6" sm="4">
                        <FormGroup inline className="mb-2 mr-sm-2 mb-sm-0">
                            <Label> State:  </Label>
                            <Input placeholder="State"/>
                        </FormGroup>
                    </Col>
                    
                    <Col sm="4">
                        <FormGroup inline className="mb-2 mr-sm-2 mb-sm-0">
                            <Label > Zip Code:  </Label>
                            <Input placeholder="Zipcode" />
                        </FormGroup>
                    </Col>
                </Row>
                <FormGroup check>
                    <Label check>
                         <Input type="checkbox"/>{'  '} 
                         By create this account, you agree to our Term & Condintion
                    </Label>
                </FormGroup>
                <Button className='search-button' >Submit</Button>
            </Form>
        </Container>
         </div>
      </div>
    );
  }
}

const styles = {
  homeStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '-30px',
    paddingTop: '200px',

    
    backgroundColor:'#897689',
    height: '100vh',
    minHeight: '720px',
    backgroundSize: 'cover',
    overflow: 'hidden'
  },

  signUp: {
    position: 'relative',
    backgroundColor: 'white',
    
    padding: '20px',
    fontFamily: 'Sofia',
    fontSize: '20px',


  }
}