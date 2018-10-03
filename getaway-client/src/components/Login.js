import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import { NavLink } from 'reactstrap';
import { login } from '../actions/auth';
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
       this.props.login(this.state.email, this.state.password);
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
                         By create this account, you agree to our <Button className="term-condition-button">Terms & Condintions</Button>
                    </Label>
                </FormGroup>
                </Form>
              </ModalBody>
              <ModalFooter>
                <Button color="info" onClick={this.toggle.bind(this)}>Submit</Button>{' '}
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

export  default connect(mapStateToProps, { login })(Login)
