import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import { NavLink } from 'reactstrap';
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
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

            <a href="/signup/">Not a Member? Sign up</a>
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