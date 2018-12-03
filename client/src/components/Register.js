import React from 'react';
import { Container, Modal, ModalBody, ModalHeader, Row, Col} from 'mdbreact';
import { NavLink } from 'reactstrap';
import { connect } from 'react-redux';
import { register } from '../actions';
import './css/Home.css'


class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          modal: false,
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
          isLoggedIn: false
        };
      }

    formatPhoneNumber = str => {
        var stripped = ('' + str).replace(/\D/g, '');
        var match = stripped.match(/^(\d{3})(\d{3})(\d{4})$/);
    
        if (match) 
          return '(' + match[1] + ') ' + match[2] + '-' + match[3];
        return '';
    }
    
    handleSubmit = e => {
        e.preventDefault();
        e.target.className += ' was-validated';
        if(this.formReady()){
            this.props.register({
                email: this.state.registerEmail,
                password: this.state.registerPassword,
                name: this.state.firstName + ' ' + this.state.lastName,
                address:this.state.address + ', ' + this.state.city + ', ' + this.state.state + ', ' + this.state.zipcode,
                confirmPassword: this.state.confirmPassword,
                phoneNumber: this.formatPhoneNumber(this.state.phoneNumber)
            }, err => {
                if (err)
                    console.log(err);
                else
                    console.log('Register success!')
            });
           this.setState({
                modal: !this.state.modal,
           });
        }
    }

    //needed to check the form before register and taking down modal
    formReady = () => {
        const elements = document.getElementsByClassName('form-control');
        const check = document.getElementsByClassName('form-check-input');
        for(var i = 0; i < elements.length; i++){
            //console.log(elements[i].validity.valid + ',' + elements[i])
            if(elements[i].validity.valid !== true && (i !== 10)){
                return false;
            }
        }
        if(!check[0].checked){
            return false;
        }
        return true;
    }

    changeHandler = (event) => {
      this.setState({
        [event.target.name]: event.target.value
      });
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
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

  render() {
    return (
      <Container>
        <NavLink style={{ cursor: 'pointer' }} onClick={this.toggle.bind(this)}>Register</NavLink>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Register</ModalHeader>
          <ModalBody>
            <Container className="mt-1">
                <Row className="mt-1">
                    <Col md="">
                    <form className='needs-validation' onSubmit={this.handleSubmit} noValidate>
                        <Row>
                            <div className="col-md-12 mb-12">
                                <label htmlFor="defaultFormRegisterConfirmEx3" className="grey-text">Email</label>
                                <input value={this.state.registerEmail} onChange={this.changeHandler} type="email" id="email" className="form-control" name='registerEmail' placeholder="Your Email address" required/>
                                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                                <div className="invalid-feedback">Please provide a valid email address</div>
                            </div>
                        </Row>
                        <Row>
                            <div className="col-md-6 mb-6">
                                <label htmlFor="defaultFormRegisterConfirmEx3" className="grey-text">Password</label>
                                <input value={this.state.registerPassword} onChange={this.changeHandler} type="password" id="password" minLength="6" className="form-control" name='registerPassword' placeholder="Your Password" required/>
                                <div className="invalid-feedback">Password not long enough</div>
                            </div>
                            <div className="col-md-6 mb-6">
                                <label htmlFor="defaultFormRegisterConfirmEx3" className="grey-text">Confirm Password</label>
                                <input value={this.state.confirmPassword} onChange={this.changeHandler} type="password" pattern={this.state.registerPassword} id="confirmPassword" className="form-control" name='confirmPassword' placeholder="Confirm Password" required
                                />
                                <div className="invalid-feedback">Password does not match</div>
                            </div>
                        </Row>
                        <Row>
                            <div className="col-md-12 mb-12">
                                <label htmlFor="defaultFormRegisterConfirmEx3" className="grey-text">Phone Number</label>
                                <input value={this.state.phoneNumber} onChange={this.changeHandler} type="number" id="phoneNumber" className="form-control" name='phoneNumber' placeholder="Your Phone Number" required/>
                                <div className="invalid-feedback">Please provide your phone number.</div>
                            </div>
                        </Row>
                        <Row>
                            <div className="col-md-6 mb-6">
                                <label htmlFor="defaultFormRegisterNameEx" className="grey-text">First name</label>
                                <input value={this.state.firstName} name='firstName' onChange={this.changeHandler} type="text" id="firstName" className="form-control" placeholder="First name" required/>
                                <div className="valid-feedback">Looks good!</div>
                                <div className="invalid-feedback">Please provide your first name.</div>
                            </div>
                            <div className="col-md-6 mb-6">
                                <label htmlFor="defaultFormRegisterEmailEx2" className="grey-text">Last name</label>
                                <input value={this.state.lastName} name='lastName' onChange={this.changeHandler} type="text" id="lastName" className="form-control" placeholder="Last name" required/>
                                <div className="valid-feedback">Looks good!</div>
                                <div className="invalid-feedback">Please provide your last name.</div>
                            </div>
                        </Row>
                        <Row>
                            <div className="col-md-12 mb-12">
                                <label htmlFor="defaultFormRegisterPasswordEx4" className="grey-text">Address</label>
                                <input value={this.state.address} onChange={this.changeHandler} type="text" id="address" className="form-control" name='address' placeholder="Address" required/>
                                <div className="invalid-feedback">Please provide a valid city.</div>
                                <div className="valid-feedback">Looks good!</div>
                            </div>
                        </Row>
                        <Row>
                            <div className="col-md-4 mb-4">
                                <label htmlFor="defaultFormRegisterPasswordEx4" className="grey-text">City</label>
                                <input value={this.state.city} onChange={this.changeHandler} type="text" id="city" className="form-control" name='city' placeholder="City" required/>
                                <div className="invalid-feedback">Please provide a valid city.</div>
                                <div className="valid-feedback">Looks good!</div>
                            </div>
                            <div className="col-md-4 mb-4">
                                <label htmlFor="defaultFormRegisterPasswordEx4" className="grey-text">State</label>
                                <input value={this.state.state} onChange={this.changeHandler} type="text" id="state" className="form-control" name='state' placeholder="State" required/>
                                <div className="invalid-feedback">Please provide a valid state.</div>
                                <div className="valid-feedback">Looks good!</div>
                            </div>
                            <div className="col-md-4 mb-4">
                                <label htmlFor="defaultFormRegisterPasswordEx4" className="grey-text">Zip</label>
                                <input value={this.state.zipcode} onChange={this.changeHandler} type="number" id="zipcode" className="form-control" name='zipcode' placeholder="zipcode" required/>
                                <div className="invalid-feedback">Please provide a valid zip.</div>
                                <div className="valid-feedback">Looks good!</div>
                            </div>
                        </Row>
                        <div className="col-md-12 mb-12">
                            <div className="form-check pl-0">
                                <input className="form-check-input"  type="checkbox" value="" id="invalidCheck" required />
                                <label className="form-check-label" htmlFor="invalidCheck">
                                    I agree to the terms and conditions.
                                </label>
                                <div className="invalid-feedback">
                                    You must agree before submitting.
                                </div>
                            </div>
                        </div>
                        <button className="btn btn-deep-orange register" type="submit">Register</button>
                    </form>
                    </Col>
                </Row>
            </Container>
          </ModalBody>
        </Modal>
      </Container>
    );
  }
}

export  default connect(null, {register})(Register)
