import React, { Component } from 'react';

import { Input } from 'reactstrap';
import { 
    Modal, ModalHeader, ModalBody, ModalFooter, Button,
    Row, Col,

    MDBContainer, MDBRow, MDBCol, MDBBtn
} from 'mdbreact';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import moment from 'moment';
import { Fa, Table } from 'mdbreact';
import DatePicker from "react-datepicker";
 
import "react-datepicker/dist/react-datepicker.css";


import { connect } from 'react-redux';
import { adminLogin, adminLogout } from '../../actions';

class AdminPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {

            loginModal: true,
            redirect: false,
            username: '', password: '',
            admin: null,
            reservations: [], users: [], initialized: false,
            selectedReservation: {},
            modal: false,
            isCancelling: false, cancelledData: null, isEditing: false,
            number_of_guests: 1, special_accomodations: '', end_date: new Date(Date.now().valueOf() + 172800000),
            filterBy: '', filterQuery: ''

        };
    }

    handleChange = e => {
        let { name, value } = e.target;

        
        if (name === 'filterQuery' && String(value).includes('@')) {
            this.setState({ 
                [name]: value,
                filterBy: 'email'
            });
        } else if (name === 'filterQuery' && String(value).charAt(0) === '5') {
            this.setState({ 
                [name]: value,
                filterBy: 'id'
            });
        } else if (name === 'filterQuery' && !String(value).length) {
            this.setState({
                [name]: value,
                filterBy: ''
            })
        } else {
            this.setState({ [name]: value });
        }

    }

    handleLogin = () => {
        this.props.adminLogin({ username: this.state.username, password: this.state.password });
    }

    static getDerivedStateFromProps(props, state) {
        if (props.admin !== state.admin) {
            return {
                admin: props.admin,

                loginModal: props.admin ? false : true

            };
        }
        return null;
    }


    renderLoginForm() {

        return (
            <MDBContainer>
                <MDBRow>
                    <MDBCol md="10" className="offset-md-1">
                    <div>


                        <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                        Admin Username
                        </label>
                        <input
                            type="text"
                            id="defaultFormLoginEmailEx"
                            className="form-control"
                            name="username"
                            onChange={this.handleChange}
                            value={this.state.username}
                        />
                        <label htmlFor="defaultFormLoginPasswordEx" className="grey-text">
                        Password
                        </label>
                        <input
                            type="password"
                            id="defaultFormLoginPasswordEx"
                            className="form-control"
                            name="password"
                            onChange={this.handleChange}
                            value={this.state.password}
                        />
                        <br/><br/>
                    </div>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        );
    }


    initializeData = () => {

        this.state.admin
            ? axios.get('/admins/data')
                .then(res => {
                    let { reservations, users } = res.data;
                    this.setState({
                        reservations,

                        users,
                        initialized: true

                    });
                })
                .catch(err => {
                    console.log(err);
                })
            : this.setState({ redirect: true });
    }




    renderAdminPanel() {
        this.state.initialized ? null : this.initializeData();

        return(
            <div className="container" style={styles.panelContainer}>
                { this.renderReservationWidget() }
            </div>
        )
    }

    renderReservationWidget() {
        return (
            <div className="form-control">
                <form>
                    <input placeholder="Filter reservations by reservation ID or user's email..." type="text" className="form-control" name="filterQuery" onChange={this.handleChange} value={this.state.filterQuery} />
                </form>
                <div style={styles.reservationsContainer}>
                    {this.renderReservations()}
                </div>
            </div>
        );
    }

    renderReservations() { 
        return this.state.reservations.length ?
            <Table responsive>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Dates</th>
                    <th>Destination</th>
                    <th>Hotel Name</th>
                    <th>Status</th>
                    <th>View Details</th>
                </tr>
                </thead>
                <tbody>{
                    this.state.reservations.map((v,i) => 
                        {   
                            if (!this.state.filterBy.length)
                                return v.start_date > Date.now().valueOf() ? 
                                    <tr key={v._id}>
                                        <td style={{ paddingTop: 25 }}>{v._id}</td>
                                        <td style={{ paddingTop: 25 }}>{moment(v.start_date).format("DD MMM YYYY")} - {moment(v.end_date).format("DD MMM YYYY")}</td>
                                        <td style={{ paddingTop: 25 }}>{v.city && v.city.length ? v.city : 'N/A'}</td>
                                        <td style={{ paddingTop: 25 }}>{v.hotel_name && v.hotel_name.length ? v.hotel_name : 'N/A'}</td>
                                        <td style={{ paddingTop: 25 }}>{v.cancelled ?  'Cancelled' : 'Active' }</td>

                                        <td>
                                            <Button 
                                                onClick={() => {
                                                    console.log(this.state)
                                                    this.setState({ selectedReservation: v });
                                                    this.toggleModal();
                                                    }}
                                                color="blue" 
                                                className="text-center" 
                                                style={{ margin: 0 }}>
                                                    <Fa icon="eye"></Fa>
                                            </Button>
                                        </td>
                                    </tr> : null 
                            else if (this.state.filterBy === 'email')
                                return v.start_date > Date.now().valueOf() && String(v.user.email).includes(this.state.filterQuery) ? 
                                    <tr key={v._id}>
                                        <td style={{ paddingTop: 25 }}>{v._id}</td>
                                        <td style={{ paddingTop: 25 }}>{moment(v.start_date).format("DD MMM YYYY")} - {moment(v.end_date).format("DD MMM YYYY")}</td>
                                        <td style={{ paddingTop: 25 }}>{v.city && v.city.length ? v.city : 'N/A'}</td>
                                        <td style={{ paddingTop: 25 }}>{v.hotel_name && v.hotel_name.length ? v.hotel_name : 'N/A'}</td>
                                        <td style={{ paddingTop: 25 }}>{v.cancelled ?  'Cancelled' : 'Active' }</td>

                                        <td>
                                            <Button 
                                                onClick={() => {
                                                    console.log(this.state)
                                                    this.setState({ selectedReservation: v });
                                                    this.toggleModal();
                                                    }}
                                                color="blue" 
                                                className="text-center" 
                                                style={{ margin: 0 }}>
                                                    <Fa icon="eye"></Fa>
                                            </Button>
                                        </td>
                                    </tr> : null  
                            else if (this.state.filterBy === 'id')
                            return v.start_date > Date.now().valueOf() && String(v._id).includes(this.state.filterQuery) ? 
                                <tr key={v._id}>
                                    <td style={{ paddingTop: 25 }}>{v._id}</td>
                                    <td style={{ paddingTop: 25 }}>{moment(v.start_date).format("DD MMM YYYY")} - {moment(v.end_date).format("DD MMM YYYY")}</td>
                                    <td style={{ paddingTop: 25 }}>{v.city && v.city.length ? v.city : 'N/A'}</td>
                                    <td style={{ paddingTop: 25 }}>{v.hotel_name && v.hotel_name.length ? v.hotel_name : 'N/A'}</td>
                                    <td style={{ paddingTop: 25 }}>{v.cancelled ?  'Cancelled' : 'Active' }</td>

                                    <td>
                                        <Button 
                                            onClick={() => {
                                                console.log(this.state)
                                                this.setState({ selectedReservation: v });
                                                this.toggleModal();
                                                }}
                                            color="blue" 
                                            className="text-center" 
                                            style={{ margin: 0 }}>
                                                <Fa icon="eye"></Fa>
                                        </Button>
                                    </td>
                                </tr> : null                    
                        }
                    )}
                </tbody>
            </Table>
            : null
    }

    renderCancellationBody(data) {
        let { cancelledData } = this.state;
        return (
            <div>
                <ModalBody>
                    { cancelledData ? 
                    <div>
                        {
                            cancelledData.success ? 
                            <div>
                                <h3>Cancellation Success!</h3>
                                <br/>
                                {cancelledData.charge ? 
                                    <div>
                                        <p>The cancellation was a success!</p>
                                        <p>The user has been charged ${Math.floor(data.subtotal * .1)}.</p>
                                    </div>
                                    :
                                    <div>
                                        <p>The cancellation was a success!</p>
                                        <p>The user has not been charged.</p>
                                    </div>
                                }
                            </div>
                            :
                            <div>
                                <h3>Success!</h3>
                                <p style={{ marginTop: '2em' }}>{cancelledData.msg}</p>
                            </div>
                        }
                    </div>
                    :
                    <div>
                        <h3 style={{ color: 'red' }}>Warning</h3>
                        <p>The user will be charged 10% of the subtotal paid for this reservation.</p>
                    </div>
                    }
                </ModalBody>
                <ModalFooter>
                    { this.state.cancelledData === undefined || this.state.cancelledData === null ? 
                        <Row>
                            <Col sm="6">
                                <Button color="info" onClick={() => this.setState({ isCancelling: false })}>I Don't Want to Cancel</Button>
                            </Col>
                            <Col sm="6">
                                <Button 
                                    color="danger" 
                                    onClick={() => {
                                        axios.post(`/admins/cancel-reservation/${data._id}`)
                                            .then(res => {
                                                this.setState({ cancelledData: res.data });
                                            })
                                            .catch(err => {
                                                console.log(err);
                                            });
                                    }}>
                                    Confirm Cancellation
                                </Button>
                            </Col>
                        </Row>
                        : 
                        <Button 
                            color="info" 
                            onClick={() => {
                                window.location.reload();
                            }}>
                            Got it
                        </Button>
                    }
                </ModalFooter>
            </div>
        )
    }

    renderModalData = data => 
        <div>
            <ModalBody>
                <h3>{data.hotel_name} in {data.city}</h3>
                <small className="text-center">This reservation {data.cancelled ? 'is cancelled' : 'is active'}</small><br/><br/>
                <div className="text-center">
                <b>Starts On: </b>{moment(data.start_date).format('DD MMM YYYY')}<br/>
                <b>Ends On: </b>{moment(data.end_date).format('DD MMM YYYY')}<br/>
                <b>Number of Guests: </b>{data.number_of_guests}<br/>
                <hr/>
                <b>Reserved on: </b>{moment(data.time_created).format('DD MMM YYYY HH:MM')}<br/>
                <b>Reserved by: </b>{data.user && data.user.name.length ? data.user.name : 'N/A'}<br/>
                <b>Contact Email: </b>{data.user && data.user.email.length ? data.user.email : 'N/A'}<br/>
                <b>User ID: </b>{data.user && data.user.id && data.user.id.length ? data.user.id : 'N/A, guest reservation'}
                <hr/>
                <b>Special Accomodations</b>
                <p>{data.special_accomodations && data.special_accomodations.length ? data.special_accomodations : 'None specified'}</p>
                <hr/>
                <b>Rewards Points Earned: </b>{data.rewardsPoints}<br/>
                <b>Subtotal: </b>${data.subtotal}<br/>
                <b>Tax: </b>${data.tax}<br/>
                <b>Total: </b>${data.total}<br/>
                </div>
            </ModalBody>
            { data.cancelled  ? 
                <div style={{ marginTop: '2em' }}></div> :
                <ModalFooter>
                        <div>
                            <Button color="info" onClick={() => this.setState({ isEditing: true, editData: data })}>Edit Reservation</Button>
                            <Button color="danger" onClick={() => this.setState({ isCancelling: true })}>Cancel Reservation</Button>
                        </div>
                </ModalFooter>
            }
        </div>

    renderEditingBody() {
        let data = { ...this.state.editData };

        return (
            <div>
                <ModalBody>
                    <h3>{data.hotel_name} in {data.city}</h3>
                    <small className="text-center">This reservation {data.cancelled ? 'is cancelled' : 'is active'}</small><br/><br/>
                    <div className="text-center">
                    <b>Starts On: </b>{moment(data.start_date).format('DD MMM YYYY')}<br/>
                    <b>Ends On: </b>{<DatePicker selected={this.state.end_date} onChange={end_date => this.setState({ end_date })}/>}<br/>
                    <div style={{ marginBottom: '-52px' }}></div>
                    <b>Number of Guests: </b><Input style={{ marginTop: 0 }} value={this.state.number_of_guests} className='guestPicker' onChange={this.handleChange} name="number_of_guests" type="select" id="exampleSelect">
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                                <option>6</option>
                                                <option>7</option>
                                                <option>8</option>
                                                <option>9</option>
                                                <option>10</option>
                                            </Input><br/>
                    <hr/>
                    <b>Reserved on: </b>{moment(data.time_created).format('DD MMM YYYY HH:MM')}<br/>
                    <b>Reserved by: </b>{data.user && data.user.name.length ? data.user.name : 'N/A'}<br/>
                    <b>Contact Email: </b>{data.user && data.user.email.length ? data.user.email : 'N/A'}<br/>
                    <b>User ID: </b>{data.user && data.user.id.length ? data.user.id : 'N/A, guest reservation'}
                    <hr/>
                    <label style={{ marginTop: 0 }}><b>Special Accomodations</b></label>
                    <Input type="textarea" placeholder={data.special_accomodations} value={this.state.special_accomodations} name="special_accomodations" onChange={this.handleChange}></Input>
                    <hr/>
                    <b>Rewards Points Earned: </b>{data.rewardsPoints}<br/>
                    <b>Subtotal: </b>${data.subtotal}<br/>
                    <b>Tax: </b>${data.tax}<br/>
                    <b>Total: </b>${data.total}<br/>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={() => this.setState({ isEditing: false })}>Cancel Edit</Button>
                    <Button color="info" onClick={this.handleEditSubmit}>Submit</Button>
                </ModalFooter>
            </div>
        );
    }

    handleEditSubmit = () => {
        let { special_accomodations, number_of_guests, selectedReservation, end_date } = this.state;
        axios.post('http://localhost:3001/admins/edit-reservation', {
            special_accomodations,
            number_of_guests,
            _id: selectedReservation._id,
            end_date: end_date.valueOf()
        })
            .then(() => {
                alert('Successfully edited reservation data!');
                window.location.reload();
            })
            .catch(err => {
                console.log(err);
            })
    }

    renderModal = () => {
        let data = { ...this.state.selectedReservation };

        return (
            <Modal size="large" isOpen={this.state.modal} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>
                    { this.state.isCancelling ? 'Reservation Cancellation': null }
                    { this.state.isEditing ? 'Reservation Edit': null }
                    { !this.state.isEditing && !this.state.isCancelling ? 'Reservation Details': null }
                </ModalHeader>{ 
                    this.state.isCancelling ? 
                        this.renderCancellationBody(data) : null
                } {
                    this.state.isEditing ? 
                        this.renderEditingBody(data) : null
                } {
                    !this.state.isEditing && !this.state.isCancelling ?
                        this.renderModalData(data) : null
                }
            </Modal>
        );
    }

    toggleModal = () => {
        this.state.modal ?
            this.setState({
                modal: !this.state.modal,
                isCancelling: false,
                cancelled: false,
                isEditing: false
            }) :
            this.setState({
                modal: !this.state.modal
            });

    }

    render() {
        if (this.state.redirect) {
            this.props.adminLogout();
            return <Redirect to="/" />
        } 

        return (
            <div style={styles.rootContainer}>

                {this.renderModal()}
                <Modal isOpen={this.state.loginModal}>

                    <ModalHeader>Admin Login</ModalHeader>
                    <ModalBody>
                        {this.renderLoginForm()}
                    </ModalBody>
                    <ModalFooter>
                        <MDBBtn color="info" onClick={() => this.setState({ redirect: true })}>Back to Homepage</MDBBtn>
                        <MDBBtn color="indigo" onClick={this.handleLogin}>Login</MDBBtn>
                    </ModalFooter>
                </Modal>
                { this.state.admin 
                    ? this.renderAdminPanel()
                    : null}
            </div>
        )
    }
}

const styles = {
    rootContainer: {

        minHeight: '100vh'
    },
    panelContainer: {
        paddingTop: '10em'
    },
    reservationsContainer: {
        height: '30em',
        overflowY: 'scroll',
        marginTop: '2em'

    }
};

const mapStateToProps = state => {
    return ({
        admin: state.auth.admin
    });
};

export default connect(mapStateToProps,{ adminLogin, adminLogout })(AdminPanel);