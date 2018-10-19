import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import { NavLink } from 'reactstrap';
import { login } from '../actions/auth';
import { register } from '../actions/reg';
import { connect } from 'react-redux';
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      nestedModal: false,
      closeAll: false,
      email: '',
      password: '',
      confirmpassword:'',
      registerEmail: '',
      registerPassword: '',
      firstName:'',
      lastName:'',
      address:'',
      city:'',
      state:'',
      zipcode:'',
      phoneNumber:'',
      user: {}
    };
  }

  static getDerivedStateFromProps(prevState, nextProps) {
    if (nextProps.user !== prevState.user){
      return {
        user: nextProps.user
      };
    }
    return prevState;
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  userLogin (e) {
    e.preventDefault();
       this.props.login({
         email: this.state.email,
         password: this.state.password
       });
       this.setState({
         modal: !this.state.modal
       });
  }
  userRegister (e) {
    e.preventDefault();
       this.props.register({
         email: this.state.registerEmail,
         password: this.state.registerPassword,
         firstName:this.state.firstName,
         lastName:this.state.lastName,
         address:this.state.address,
         city:this.state.city,
         state:this.state.state,
         zipcode:this.state.zipcode
       });
       this.setState({
         modal: !this.state.modal
       });
  }


  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
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
        <NavLink style={{ cursor: 'pointer' }} onClick={this.toggle.bind(this)}>Log In</NavLink>
        <Modal isOpen={this.state.modal} toggle={this.toggle.bind(this)} className={this.props.className}>

          <ModalHeader className="login-header" toggle={this.toggle.bind(this)}>Welcome Back! </ModalHeader>

          <ModalBody>
            <Form className = "login-body"   >
                <FormGroup>
                    <Label for="exampleEmail">Email:</Label>
                    <Input type="email" name="email" value={this.state.email} onChange={this.handleChange.bind(this)} id='exampleEmail' placeholder="Enter Your Email" />
                </FormGroup>

                <FormGroup>
                    <Label for="examplePassword">Password:</Label>
                    <Input type="password" name="password" value={this.state.password}  onChange={this.handleChange.bind(this)} id='examplePassword' placeholder="Enter Your Password" />
                </FormGroup>
            </Form>

            <Button onClick={this.toggleNested.bind(this)}>Not a member yet? Sign Up</Button>
            <Modal isOpen={this.state.nestedModal} toggle={this.toggleNested.bind(this)} onClosed={this.closeAll ? this.toggle : undefined} className={this.props.className}>
              <ModalBody>
                <Form className = "login-body">
                <Row>
                     <Col >
                        <FormGroup inline className="mb-2 mr-sm-2 mb-sm-0">
                        <Label for="exampleRegEmail">Email:</Label>
                        <Input type="email" name="registerEmail" value={this.state.registerEmail} onChange={this.handleChange.bind(this)} id='exampleRegEmail' placeholder="Enter Your Email" /> 
                        </FormGroup>
                    </Col>

                    <Col >
                        <FormGroup inline className="mb-2 mr-sm-2 mb-sm-0">
                        <Label for="exampleRegPassword">Password:</Label>
                        <Input type="password" name="registerPassword" value={this.state.registerPassword}  onChange={this.handleChange.bind(this)} id='exampleRegPassword' placeholder="Enter Your Password" />   
                        </FormGroup>
                    </Col>
                    <Col >
                        <FormGroup inline className="mb-2 mr-sm-2 mb-sm-0">
                        <Label for="exampleRegPassword">Confirm Password:</Label>
                        <Input type="password" name="registerPassword" value={this.state.confirmpassword}  onChange={this.handleChange.bind(this)} id='exampleComPassword' placeholder="Enter Your Password" />   
                        </FormGroup>
                    </Col>
                </Row>

                <Row>
                     <Col >
                        <FormGroup inline className="mb-2 mr-sm-2 mb-sm-0">
                            <Label for="exampleFirstName"> First Name:  </Label>
                            <Input type="text" name="firstName" value={this.state.firstName}  onChange={this.handleChange.bind(this)} id='exampleFirstName' placeholder="Enter your first name" />
                        </FormGroup>
                    </Col>

                    <Col >
                        <FormGroup inline className="mb-2 mr-sm-2 mb-sm-0">
                            <Label for="exampleLastName"> Last Name:  </Label>
                            <Input type="text" name="lastName" value={this.state.lastName}  onChange={this.handleChange.bind(this)} id='exampleLastName' placeholder="Enter your last name"/>
                        </FormGroup>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <FormGroup inline className="mb-2 mr-sm-2 mb-sm-0">
                            <Label for="exampleAddress"> Address:  </Label>
                            <Input type="text" name="address" value={this.state.address}  onChange={this.handleChange.bind(this)} id='exampleAddress' placeholder="Address"/>
                        </FormGroup>
                    </Col>
                </Row>

                <Row>
                    <Col xs="6" sm="4">
                        <FormGroup inline className="mb-2 mr-sm-2 mb-sm-0">
                            <Label for="exampleCity"> City:  </Label>
                            <Input type="text" name="city" value={this.state.city}  onChange={this.handleChange.bind(this)} id='exampleCity' placeholder="City"/>
                        </FormGroup>
                    </Col>
                    <Col xs="6" sm="4">
                        <FormGroup inline className="mb-2 mr-sm-2 mb-sm-0">
                            <Label for="exampleState"> State:  </Label>
                            <Input type="text" name="state" value={this.state.state}  onChange={this.handleChange.bind(this)} id='exampleState' placeholder="State"/>
                        </FormGroup>
                    </Col>

                    <Col sm="4">
                        <FormGroup inline className="mb-2 mr-sm-2 mb-sm-0">
                            <Label for="exampleCity"> Zip Code:  </Label>
                            <Input type="text" name="zipcode" value={this.state.zipcode}  onChange={this.handleChange.bind(this)} id='exampleZipCode' placeholder="Zip Code"/>
                        </FormGroup>
                    </Col>

                    <Col xs="6" sm="4">
                        <FormGroup inline className="mb-2 mr-sm-2 mb-sm-0">
                            <Label for="exampleState"> Phone Number:  </Label>
                            <Input type="text" name="phoneNumber" value={this.state.phoneNumber}  onChange={this.handleChange.bind(this)} id='examplePhoneNumber' placeholder="PhoneNumber"/>
                        </FormGroup>
                    </Col>
                </Row>
                <FormGroup check>
                    <Label check className="term-condition">
                         <Input type="checkbox"/>{'  '}
                         By create this account, you agree to our <Button className="term-condition-button">Terms & Condintions</Button>
                    </Label>
                </FormGroup>
                </Form>
              </ModalBody>
              <ModalFooter>
                <Button color="info" onClick={this.userRegister.bind(this)}>Submit</Button>{' '}
                <Button color="secondary" onClick={this.toggle.bind(this)}>Cancel</Button>
              </ModalFooter>
            </Modal>
          </ModalBody>

          <ModalFooter>
            <Button color="info" onClick={this.userLogin.bind(this)}>Log In</Button>{' '}
            <Button color="secondary" onClick={this.toggle.bind(this)}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user
    };
}

export  default connect(mapStateToProps, { login,register})(Login)
