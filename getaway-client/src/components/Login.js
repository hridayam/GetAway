import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import { NavLink } from 'reactstrap';
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      nestedModal: false,
      closeAll: false
    };

    this.toggle = this.toggle.bind(this);
    this.toggleNested = this.toggleNested.bind(this);
    this.toggleAll = this.toggleAll.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  toggleNested() {
    this.setState({
      nestedModal: !this.state.nestedModal,
      closeAll: false
    });
  }

  toggleAll() {
    this.setState({
      nestedModal: !this.state.nestedModal,
      closeAll: true
    });
  }

  render() {
    return (
      <div >
        <NavLink style={{ cursor: 'pointer' }} onClick={this.toggle}>Log In</NavLink>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          
          <ModalHeader className="login-header" toggle={this.toggle}>Welcome Back! </ModalHeader>
          
          <ModalBody className = "login-body">
            <Form>
                <FormGroup>
                    <Label for="exampleEmail">Email</Label>
                    <Input type="email" name="email" id="exampleEmail" placeholder="Enter Your Email" />
                </FormGroup>

                <FormGroup>
                    <Label for="examplePassword">Password</Label>
                    <Input type="password" name="password" id="examplePassword" placeholder="Enter Your Password" />
                </FormGroup>
            </Form>

            <Button className="sign-up" onClick={this.toggleNested}>Not a member yet? Sign Up</Button>
            <Modal isOpen={this.state.nestedModal} toggle={this.toggleNested} onClosed={this.closeAll ? this.toggle : undefined}>
              <ModalBody className = "login-body">
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
                    <Label check className="term-condition">
                         <Input type="checkbox"/>{'  '} 
                         By create this account, you agree to our <Button className="term-condition-button">Term & Condintion</Button>
                    </Label>
                </FormGroup>
                <Button className='search-button' >Submit</Button>
                </Form>
              </ModalBody>
              <ModalFooter>
                <Button color="info" onClick={this.toggle}>Log In</Button>{' '}
                <Button color="secondary" onClick={this.toggle}>Cancel</Button>
              </ModalFooter>
            </Modal>
          </ModalBody>

          <ModalFooter>
            <Button color="info" onClick={this.toggle}>Log In</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}