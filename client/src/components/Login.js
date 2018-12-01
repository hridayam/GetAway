import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Container, Row, Col,
  } from 'mdbreact';
import { NavLink } from 'reactstrap';
import axios from 'axios';
import FileBase64 from 'react-file-base64';
import GoogleButton from 'react-google-button';

import { login, logout, register, userLoggedIn } from '../actions/auth';
import { connect } from 'react-redux';

import './css/Home.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      modal6: false,
      modal7: false,
      modal8: false,
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
      error: false,
      popoverOpen: false,

      profileEmail: '',
      profilePhoneNumber: 0,
      profileAddress: '',
      isEditing: false,
      profilePic: '',
      file: ''
    };

  }

  static getDerivedStateFromProps(props, state) {
    if (props.user !== state.user){
      if (props.user !== undefined && props.user) {
        let { email, phoneNumber, address, profilePic } = props.user;
        return {
          ...state,
          user: props.user,
          profileEmail: email,
          profilePhoneNumber: phoneNumber,
          profileAddress: address,
          profilePic
        };
      } else {
        return {
          ...state,
          user: null
        }
      }
    }
    return null;
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  submitHandler = (event) => {
    event.preventDefault();
    this.props.login({
      email: this.state.email,
      password: this.state.password
    }, (err) => {
     if(err) {
       this.setState({ error: true})
     } else {
       this.setState({
         isLoggedIn: true
       });
     }
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
      [event.target.name]: event.target.value,
    });

  }

  toggleLogged(nr) {
    let modalNumber = 'modal' + nr
    this.setState({
      [modalNumber]: !this.state[modalNumber]
    })
  }

  formatPhoneNumber = str => {
    var stripped = ('' + str).replace(/\D/g, '');
    var match = stripped.match(/^(\d{3})(\d{3})(\d{4})$/);

    if (match)
      return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    return '';
  }

  renderProfileInfo() {
    return this.state.isEditing ?
      <div className="container">
          <div className="form-control">
            <b>Upload New Image</b><br/><FileBase64 onDone={file => this.setState({ file: file.base64 })}/><br/><br/>
            <b>Email</b><br/>{this.state.profileEmail}<br/><br/>
            <b>Phone Number</b><br/><input className="form-control" onChange={this.handleChange} name="profilePhoneNumber" type="text" value={this.state.profilePhoneNumber}/><br/>
            <b>Address</b><br/><input className="form-control" onChange={this.handleChange} name="profileAddress" type="text" value={this.state.profileAddress}/><br/>
            <button onClick={this.handleProfileEditSubmit} className="btn btn-deep-orange login">Submit Changes</button>
          </div>
      </div>:
      <div className="container">
        <div className="form-control">
          <b>Email</b><br/>{this.state.profileEmail} <br/><br/>
          <b>Phone Number</b><br/>{this.state.profilePhoneNumber} <br/><br/>
          <b>Address</b><br/>{this.state.profileAddress} <br/><br/>
        </div>
      </div>
  }

  handleProfileEditSubmit = () => {
    axios.post(
      '/users/edit-profile', {
        email: this.state.profileEmail,
        newPhoneNumber: this.formatPhoneNumber(this.state.profilePhoneNumber),
        newAddress: this.state.profileAddress,
        file: this.state.file
    })
      .then(res => {
        if (res.data.success) {
          localStorage.setItem('data', JSON.stringify(res.data.user));
          this.props.userLoggedIn({token: this.props.token, user: res.data.user});

          let { phoneNumber, address } = res.data.user;
          this.setState({
            isEditing: false,
            profilePhoneNumber: phoneNumber,
            profileAddress: address
          });
        }
      })
      .catch(err => {
        alert(err);
      });
  }

  render() {
    if (this.state.user)
      return(
        <div>
          <NavLink style={{ cursor: 'pointer' }} onClick={() => this.toggleLogged(8)}>Profile</NavLink>
          <Modal isOpen={this.state.modal8} toggle={() => this.toggleLogged(8)} fullHeight position="right">
              <ModalHeader className="profileHeader" toggle={() => this.toggleLogged(8)}>
                <div>Profile overview</div>
              </ModalHeader>
              <ModalBody>
                  <img alt="" src={this.state.user.profilePic} style={styles.imageStyles}/>
                <Row>
                  {this.renderProfileInfo()}
                </Row>
                <Row>
                  <Col>
                    {this.state.isEditing ? <Button color="btn btn-deep-orange login" onClick={() => this.setState({ isEditing: !this.state.isEditing })}>Cancel Edit</Button> : <Button color="btn btn-deep-orange login" onClick={() => this.setState({ isEditing: !this.state.isEditing })}>Edit</Button>}
                  </Col>
                </Row>
                <Row>
                  {/* <Col>
                    <Button color="btn btn-deep-orange logout" onClick={() => this.toggleLogged(8)}>Close</Button>
                  </Col> */}

                  <Col sm="12">

                    <Button color="btn btn-deep-orange logout" onClick={this.userLogout.bind(this)}>Logout</Button>
                  </Col>
                </Row>
              </ModalBody>
            </Modal>
        </div>
      );

    else
      return (
        <div >
          <Container>
            <NavLink style={{ cursor: 'pointer' }} onClick={this.toggle.bind(this)}>Log In</NavLink>
            <Modal isOpen={this.state.modal} toggle={this.toggle.bind(this)}>
              <ModalHeader toggle={this.toggle.bind(this)}>Welcome Back!</ModalHeader>
              <ModalBody>
                <Row className="mt-6">
                  <Col>
                    <form className='needs-validation' onSubmit={this.submitHandler}>
                    <Row>
                      <div className="col-md-12 mb-12">
                        <label htmlFor="defaultFormRegisterNameEx" className="grey-text">User Name</label>
                        <input value={this.state.email}  name='email' onChange={this.handleChange.bind(this)} type="email" id="defaultFormRegisterNameEx" className="form-control" placeholder="User Name" required/>
                      </div>
                    </Row>
                    <Row>
                      <div className="col-md-12 mb-12">
                        <label htmlFor="defaultFormRegisterNameEx" className="grey-text">Password</label>
                        <input value={this.state.password} name='password' onChange={this.handleChange.bind(this)} type="password" id="defaultFormRegisterNameEx" className="form-control" placeholder="Password" required/>
                      </div>
                    </Row>
                    <hr/>
                    <Row>
                      <a href="http://localhost:3001/auth/google">
                        <GoogleButton />
                      </a>
                    </Row>
                    {this.state.error? <div style={{color: 'red'}}>Either username or password is incorrect</div>: <p></p>}
                      <button className="btn btn-deep-orange login" type='submit'>Log In</button>
                      <button className="btn btn-deep-orange logout" onClick={this.toggle.bind(this)}>Cancel</button>
                    </form>
                  </Col>
                </Row>
              </ModalBody>
            </Modal>
          </Container>
        </div>
      );
  }
}

const mapStateToProps = state => {
    if(!!state.auth.token){
        return {
            isLoggedIn: !!state.auth.token,
            user: state.auth.user,
            token: state.auth.token
        };
    }
}

const styles ={
  imageStyles:{
    borderRadius: '50%',
    border: "#A9A9A9",
    marginBottom: '10px',
    width: '250px',
    height:'250px'
  },
  popover:{
    textAlign: 'center',
    marginBottom:'10px'
  },
  headerStyle:{
    marginTop:10,
    color: 'white',
    fontWeight: 'normal',
  }
}
export default connect(mapStateToProps, { login, logout, register, userLoggedIn })(Login)
