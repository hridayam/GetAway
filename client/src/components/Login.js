import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,
   Form, FormGroup, Label, Input, Row, Col,
  Popover, PopoverBody, PopoverHeader, Table} from 'reactstrap';
import { NavLink } from 'reactstrap';
import {Redirect} from 'react-router-dom';

import { login, logout, register } from '../actions/auth';
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

      confirmPassword:'',
      registerEmail: '',
      registerPassword: '',
      firstName:'',
      lastName:'',
      address:'',
      city:'',
      state:'',
      zipcode:'',
      phoneNumber:'',
      user: {},
      isLoggedIn: false,
      popoverOpen: false

    };

  }
  
  static getDerivedStateFromProps(props, state) {
    if (props.user !== state.user){
      return {
        ...state,
        user: props.user
      };
    }
    return null;
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  userLogin (e) {
    e.preventDefault();
       this.props.login({
         email: this.state.email,
         password: this.state.password
       });
       this.setState({
         modal: !this.state.modal,
         isLoggedIn: true
       });
  }

  userRegister (e) {
    e.preventDefault();
       this.props.register({
         email: this.state.registerEmail,
         password: this.state.registerPassword,
         name: this.state.firstName + ' ' + this.state.lastName,
         address:this.state.address + ' ' + this.state.city + ' ' + this.state.state + ' ' + this.state.zipcode,
         city:this.state.city,
         state:this.state.state,
         zipcode:this.state.zipcode,
         confirmPassword: this.state.confirmPassword,
         phoneNumber: this.state.phoneNumber
       });
       this.setState({
         modal: !this.state.modal
       });
  }

  userLogout(e){
    e.preventDefault();
    this.props.logout();
    this.setState({
      isLoggedIn:false
    })
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
      closeAll: true,
    });
  }
  togglePop() {
    this.setState({
      popoverOpen: !this.state.popoverOpen,
    });
  }

  render() {
    if (this.state.user)
      return(
        <div>  
          <NavLink id="Popover1" style={{ cursor: 'pointer' }} onClick={this.togglePop.bind(this)}>Profile</NavLink>
          <Popover placement="bottom" isOpen={this.state.popoverOpen} target="Popover1" togglePop={this.togglePop} style={styles.popover}>
          <PopoverHeader>Hello! {this.props.user.name}</PopoverHeader>
          <PopoverBody>
          <img alt="" src="http://ssl.gstatic.com/accounts/ui/avatar_2x.png" style={styles.imageStyles}/>
          <Table size="sm" style={styles.tableborder}>
            <thead>
              <tr>
                <th  style= {styles.headerStyle}>Contact Information</th>
              </tr>
            </thead>
            
            <tbody>
              <tr>
                <td style={styles.tableStyle}>Email: {this.props.user.email}</td>
              </tr>
              <tr>
                <td style={styles.tableStyle} >Phone Number: {this.props.user.phoneNumber}</td>
              </tr>
              <tr>
                <td style={styles.tableStyle}>Address: {this.props.user.address}</td>
              </tr>
            </tbody>
          </Table>
          </PopoverBody>
            <Button style ={{marginRight: '10px'}} >Edit</Button>
            <Button style ={{marginLeft: '10px'}} onClick={this.userLogout.bind(this)}>Logout</Button>
          </Popover>
          
        </div>
      );

    else
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
              <a href="/register">Not a member yet? Sign Up</a>

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

const mapStateToProps = state => {
    if(!!state.auth.token){
        return {
            isLoggedIn: !!state.auth.token,
            user: state.auth.user
        };
    }
}

const styles ={
  imageStyles:{
    borderRadius: '50%',
    border: "2px solid #A9A9A9",
    marginBottom: '10px',
},
  popover:{
    textAlign: 'center',
    marginBottom:'10px'
  },
  headerStyle:{
    marginTop:10,
    backgroundColor: '#2e908a',
    color: 'white',
    fontWeight: 'normal',
    border: '2px solid black'
},
}
export  default connect(mapStateToProps, { login, logout, register })(Login)

