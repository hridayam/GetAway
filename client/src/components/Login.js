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
          address: address.split(",")[0],
          city: address.split(",")[1],
          state: address.split(",")[2],
          zipcode: address.split(",")[3],
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

  sendResetLink() {
    if (this.state.email.length === 0) {
      return alert('please fill in the email field before clicking submit')
    }
    axios.post('http://localhost:3001/users/forgotPassword', { email: this.state.email })
    .then(() => {
      alert('please check your inbox for password reset link');
    })
    .catch(err => {
      alert('verify email address and retry');
    })
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
            <b>Address</b><br/><input className="form-control" onChange={this.handleChange} name="address" type="text" value={this.state.address}/><br/>
            <b>City</b><br/><input className="form-control" onChange={this.handleChange} name="city" type="text" value={this.state.city}/><br/>
            <b>State</b><br/><input className="form-control" onChange={this.handleChange} name="state" type="text" value={this.state.state}/><br/>
            <b>ZIP Code</b><br/><input className="form-control" onChange={this.handleChange} name="zipcode" type="text" value={this.state.zipcode}/><br/>
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
        newAddress: [this.state.address, this.state.city, this.state.state, this.state.zipcode].join(', '),
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
            profileAddress: address,
            address: address.split(",")[0],
            city: address.split(",")[1],
            state: address.split(",")[2],
            zipcode: address.split(",")[3]
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
                {this.state.error? <div class="alert alert-danger" role="alert"><i class="fas fa-exclamation-triangle"></i> Either username or password is incorrect</div>: <p></p>}
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
                      <Col sm="12" md="6">
                        <a href="http://localhost:3001/auth/google">
                          <GoogleButton />
                        </a>
                      </Col>

                    </Row>
                    <Row>
                      <Col style={{justifyContent:'center'}} sm='12' md='6'>
                          <Button className="btn btn-deep-orange" type='button' onClick={this.sendResetLink.bind(this)}>forgot password</Button>
                      </Col>

                    </Row>
                      <button className="btn btn-deep-orange login" type='submit'>Log In</button>
                      <button className="btn btn-deep-orange logout" type='button' onClick={() => {this.setState({ modal: false })}}>Cancel</button>
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
    return {};
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
