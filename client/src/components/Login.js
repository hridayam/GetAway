import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Container, Row, Col,
   Popover, PopoverBody, PopoverHeader, Table} from 'mdbreact';
import { NavLink } from 'reactstrap';
import './css/Home.css'
import { login, logout, register } from '../actions/auth';
import { connect } from 'react-redux';
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      modal6: false,
      modal7: false,
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
         modal: !this.state.modal,
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

  render() {
    if (this.state.user)
      return(
        <div>
          <Container>
          <NavLink style={{ cursor: 'pointer' }} onClick={() => this.toggleLogged(8)}>Profile</NavLink>
            <Modal isOpen={this.state.modal8} toggle={() => this.toggleLogged(8)} fullHeight position="right">
              <ModalHeader toggle={() => this.toggleLogged(8)}>
                <img alt="" src="http://ssl.gstatic.com/accounts/ui/avatar_2x.png" style={styles.imageStyles}/>
              </ModalHeader>
              <ModalBody>
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
              </ModalBody>
              <ModalFooter>
                <Button color="secondary" onClick={() => this.toggleLogged(8)}>Close</Button>
                <Button color="primary">Edit</Button>
                <Button style ={{marginLeft: '10px'}} onClick={this.userLogout.bind(this)}>Logout</Button>
              </ModalFooter>
            </Modal>
          </Container>
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
                  <Col md="">
                    <form className='needs-validation' onSubmit={this.submitHandler} noValidate>
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
                    {this.state.error? <div style={{color: 'red'}}>Either username or password is incorrect</div>: <p></p>}
                      <button className="btn btn-deep-orange login" type='submit'>Log In</button>
                      <button className="btn btn-deep-orange login" onClick={this.toggle.bind(this)}>Cancel</button>
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
            user: state.auth.user
        };
    }
}

const styles ={
  imageStyles:{
    borderRadius: '50%',
    border: "2px solid #A9A9A9",
    marginBottom: '10px',
    horizontalAlign: 'center'
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
