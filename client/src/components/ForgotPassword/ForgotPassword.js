import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import axios from 'axios'

class ForgotPassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            password: '',
            confirmPassword: ''
        }

        this.resetPassword = this.resetPassword.bind(this)
    }
    

    resetPassword = () => {
        console.log(this.state);
        axios.post("http://localhost:3001/users/resetPassword", { 
            ...this.state, 
            token: this.props.match.params.token
        })
        .then(() => {
            alert('password changed');
            this.props.history.push('/');
        })
        .catch((err) => {
            alert('generated token might have expired');
        });
    }

    render() {
        return(
            <MDBContainer style={{paddingTop: 100}}>
                <MDBRow>
                    <MDBCol md="6">
                        <form>
                            <p className="h5 text-center mb-4">Reset Password</p>
                            <div className="grey-text">
                                <MDBInput
                                    label="password"
                                    icon="lock"
                                    value={this.state.password}
                                    getValue={(value) => {this.setState({password:value})}}
                                    group
                                    type="password"
                                    validate
                                />
                                <MDBInput
                                    label="confirm password"
                                    icon="lock"
                                    value={this.state.confirmPassword}
                                    getValue={(value) => {this.setState({confirmPassword:value})}}
                                    group
                                    type="password"
                                    validate
                                />
                            </div>
                            <div className="text-center">
                                <MDBBtn
                                    onClick={this.resetPassword}
                                >Reset Password</MDBBtn>
                            </div>
                        </form>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        )
    }
}

export default ForgotPassword;