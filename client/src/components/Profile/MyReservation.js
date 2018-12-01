import React, { Component } from 'react';
import { Table } from 'reactstrap';
import { Fa} from 'mdbreact';
import { Container, Row, Col, } from 'reactstrap';
import {TabContent, TabPane, div, a, Button} from 'reactstrap';

import Scroll from '../ScrollUp';
import moment from 'moment';
import { Animated } from 'react-animated-css';

import {connect} from 'react-redux';
import { getAllReservations } from '../../actions';

import '../picture/slide/2.jpg';
import '../css/Home.css';

class MyReservation extends Component{

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.toggle1 = this.toggle1.bind(this);
        this.toggle2 = this.toggle2.bind(this);
        this.state = {
            activeTab: '1',
            active: 1,
            oldActive: 1,
            modal1: false,
            modal2: false,
            reservations: [],
            tabStyles: [ styles.activeTabStyle, styles.inactiveTabStyle ],
            user: {},
        };
    }

    componentDidMount() {
        this.props.getAllReservations(this.state.user._id)
    }

    toggle1() {
        this.setState({
            modal1: !this.state.modal1
        });
    }
    toggle2() {
        this.setState({
            modal2: !this.state.modal2
        });
    }
    toggle(tab) {
        if (this.state.activeTab !== tab) {
            let { active, tabStyles } = this.state;
            tabStyles[parseInt(tab) - 1] = styles.activeTabStyle;
            tabStyles[this.state.active - 1] = styles.inactiveTabStyle;

            this.setState({
                activeTab: tab,
                active: parseInt(tab),
                oldActive: active
            });
        }
    }

    // renderAllReservations(){
    //     if(this.state.reservations && this.state.reservations !== undefined){
    //         return this.state.reservations.map((reservation, index) =>
    //         <tr key={reservation._id}>
    //             <th scope="row">{index}</th>
    //             <td>{reservation.start_date}</td>
    //             <td>Los Angeles</td>
    //             <td>Single</td>
    //             <td>1</td>
    //             <td>Active</td>
    //         </tr>
    //         )
    //     }
    // }

    renderAllRewards = () =>
        this.state.reservations.length ?
            <Table style={styles.tableStyle}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Date Booked</th>
                        <th>Total Charged</th>
                        <th>Points Earned</th>
                    </tr>
                </thead>
                <tbody>
                    { this.state.reservations.map((v,i) =>
                        <tr>
                            <td>{v._id}</td>
                            <td>{moment(v.time_created).format("DD MMM YYYY")}</td>
                            <td>$ {v.total}</td>
                            <td>{v.rewardsPoints}</td>
                        </tr>
                    )}

                </tbody>
            </Table>
        :
            <div style={{ margin: '10% 0 10% 0'}}>
                <h5>No Rewards Awarded Yet!</h5>
                <p>Go book a reservation now :)</p>
            </div>

    renderAllReservations = () =>
    /*
        <th>ID</th>
        <th>Dates</th>
        <th>Destination</th>
        <th>Hotel Name</th>
        <th>Room Type</th>
        <th># of Guests</th>
        <th>Status</th>
    */
        this.state.reservations.length ?
            <Table responsive style={styles.tableStyle}>
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
                        <tr>
                            {console.log(v)}
                            <td style={{ paddingTop: 25 }}>{v._id}</td>
                            <td style={{ paddingTop: 25 }}>{moment(v.start_date).format("DD MMM YYYY")} - {moment(v.end_date).format("DD MMM YYYY")}</td>
                            <td style={{ paddingTop: 25 }}>{v.city && v.city.length ? v.city : 'N/A'}</td>
                            <td style={{ paddingTop: 25 }}>{v.hotel_name && v.hotel_name.length ? v.hotel_name : 'N/A'}</td>
                            <td style={{ paddingTop: 25 }}>{v.cancelled ?  'Cancelled' : 'Active' }</td>
                            <td><Button color="blue" className="text-center" style={{ margin: 0 }}><Fa icon="eye"></Fa></Button></td>
                        </tr>
                    )}
                </tbody>
            </Table>
            :
                <div style={{ margin: '10% 0 10% 0'}}>
                    <h5>No Reservations Yet!</h5>
                    <p>Go book a reservation now :)</p>
                </div>


    static getDerivedStateFromProps(props, state) {
        if (state.user !== props.user || state.reservations !== props.reservations){
            return {
                user: props.user,
                reservations: props.reservations
            };
        }
        return null;
    }


    render(){
        return(
            <div className="background-image2">
                <Scroll/>
                <Animated animationIn="fadeInDown" animationOut="fadeOut" isVisible={true}>
                    <Container style={{ marginTop: '10em' }}>
                        <Row style = {styles.textBlock}>
                            <Col sm={12}>
                                <div className="row" style={{borderBottomColor: "transparent",padding: '25px'}}>
                                    <div className="col-sm-3 offset-sm-3" style= {this.state.tabStyles[0]}>
                                        <a onClick={() => { this.toggle('1'); }}>
                                            My Reservations
                                        </a>
                                    </div>
                                    <div className="col-sm-3" style= {this.state.tabStyles[1]}>
                                        <a onClick={() => { this.toggle('2'); }}>
                                            Rewards
                                        </a>
                                    </div>
                                </div>

                                <TabContent activeTab={this.state.activeTab}>
                                    <TabPane tabId="1">
                                        {this.renderAllReservations()}
                                    </TabPane>
                                    <TabPane tabId="2">
                                    <hr/>
                                    <h4>Your Rewards Points: {this.state.user.rewardsPoints} </h4>
                                    <hr/>
                                    {this.renderAllRewards()}
                                    </TabPane>
                                </TabContent>
                            </Col>
                        </Row>
                    </Container>
                </Animated>
            </div>
        );
    }
}

const styles = {
    redeemFail: {
        color: 'red'
    },
    redeemSuccess: {
        color: 'green'
    },
    profileStyle: {
        flex: 1,
        marginTop: '-30px',
        paddingTop: '200px',
    },
    imageStyles:{
        borderRadius: '50%',
        border: "2px solid #A9A9A9",
        marginBottom: '10px'
    },
    headerStyle:{
        marginTop:10,
        backgroundColor: '#2e908a',
        color: 'white',
        fontWeight: 'normal',
        border: '2px solid black'
    },
    // tableStyle:{
    //     backgroundColor: '#f5f5f5',
    //     marginTop: '10px',
    //     textAlign: 'center',
    // },
    tabStyle:{
        backgroundColor: 'transparent',
        color: 'white',
        marginBottom: '10px',
    },
    activeTabStyle: {
        backgroundColor: 'transparent',
        color: 'white',
        borderBottom: 'solid 2px white',
        padding: 10
    },
    inactiveTabStyle: {
        backgroundColor: 'transparent',
        color: 'white',
        padding: 10
    },
    // nameStyle:{
    //     color:'black',
    //     fontFamily:'Georgia',
    //     fontSize: '30px',
    //     fontWeight:'thick',
    //     marginTop: '10px'
    // },
    uploadStyle:{
        visibility: 'hidden'
    },
    tableborder: {
        border: "2px solid black",
        borderRadius: "10px"
    },
    textBlock: {
        position: 'relative',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: '20px',
        textAlign: 'center',
        marginTop: '20px',
        color: 'white',
        minHeight: '50vh'
    },


}


const mapStateToProps = state => {
    return{
        user: state.auth.user,
        reservations: state.reservation.reservations
    };
}

export default connect (mapStateToProps, { getAllReservations })(MyReservation);
