import React, { Component } from 'react';
import { Table } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap'
import {TabContent, TabPane, Nav, div, a, Button} from 'reactstrap';
import {Form, FormGroup, Label, Input} from 'reactstrap';
import {Modal,ModalBody} from 'reactstrap';
import {connect} from 'react-redux';
import '../picture/slide/2.jpg';
import '../css/Home.css';
import Scroll from '../ScrollUp';
import { getAllReservations } from '../../actions/'

class Profile extends Component{

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.toggle1 = this.toggle1.bind(this);
        this.toggle2 = this.toggle2.bind(this);
        this.state = {
            activeTab: '1',
            active: 1,
            oldActive: 1,
            rewardPoint:29,
            modal1: false,
            modal2: false,
            reservations: [],
            tabStyles: [ styles.activeTabStyle, styles.inactiveTabStyle, styles.inactiveTabStyle ]
        };
    }

    componentDidMount() {
        this.props.getAllReservations()
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

    allReservationRender(){
        if(this.state.reservations !== null){
            return this.state.reservations.map((reservation, index) =>
            <tr key={reservation._id}>
                <th scope="row">{index}</th>
                <td>{reservation.start_date}</td>
                <td>Los Angeles</td>
                <td>Single</td>
                <td>1</td>
                <td>Active</td>
            </tr>
            )
        }
    } 


    static getDerivedStateFromProps(props, state) {
        if (state.user !== props.user){
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
            <div class="row" style= {styles.profileStyle}>
            </div>
            <Scroll/>
            <Container >
                <Row style = {styles.textBlock}>
                    <Col sm="12" md={{ size: 6, offset: 3 }}>
                        <div className="row" style={{borderBottomColor: "transparent",padding: '25px'}}>
                            <div className="col-sm-4" style= {this.state.tabStyles[0]}>
                                <a onClick={() => { this.toggle('1'); }}>
                                    My Reservations
                                </a>
                            </div>
                            <div className="col-sm-4" style= {this.state.tabStyles[1]}>
                                <a onClick={() => { this.toggle('2'); }}>
                                    Edit Profile
                                </a>
                            </div>

                            <div className="col-sm-4" style= {this.state.tabStyles[2]}>
                                <a onClick={() => { this.toggle('3'); }}>
                                    Rewards
                                </a>
                            </div>
                        </div>
                        
                        <TabContent activeTab={this.state.activeTab}>
                            <TabPane tabId="1">
                            <Row>
                                <Col>
                                    <Table  responsive style={styles.tableStyle}>
                                        <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Date of Arrival</th>
                                            <th>Destination</th>
                                            <th>Room Type</th>
                                            <th># of Guests</th>
                                            <th>Status</th>
                                        </tr>
                                        </thead>
                                        <tbody>{this.allReservationRender()}</tbody>
                                    </Table>
                                </Col>
                            </Row>
                            </TabPane>

                            <TabPane tabId="2">
                            <Row>
                                <Col >
                                    <Form>
                                        <Row>
                                            <FormGroup>
                                                <Label>First Name</Label>
                                                <Input type="text" placeholder='Ex: John' />
                                            </FormGroup>
                                            <Col>
                                            <FormGroup>
                                                <Label>Last Name</Label>
                                                <Input type="text" placeholder='Ex: Smith' />
                                            </FormGroup>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <FormGroup>
                                                <Label>Mobile</Label>
                                                <Input type="text" placeholder='Enter mobile number' />
                                            </FormGroup>
                                            <Col>
                                            <FormGroup>
                                                <Label for="exampleEmail">Email</Label>
                                                <Input type="email" name="email" id="exampleEmail" placeholder='Enter Email' />
                                            </FormGroup>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <FormGroup>
                                                <Label for="examplePassword">Password</Label>
                                                <Input type="password" name="password" id="examplePassword" placeholder="Enter Password" />
                                            </FormGroup>
                                            <Col>
                                            <FormGroup>
                                                <Label >Verify</Label>
                                                <Input type="password" placeholder="Enter Password Again" />
                                            </FormGroup>
                                            </Col>
                                        </Row>
                                        <Button>Submit</Button>
                                    </Form>
                                </Col>
                            </Row>
                            </TabPane>
            
                            <TabPane tabId="3">
                            <h4 style={styles.headerStyle}>Your Rewards Point: {this.state.rewardPoint}</h4>
                            <Table style={styles.tableStyle}>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Date</th>
                                    <th>Price</th>
                                    <th>Points Earned</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <th scope="row">83923242</th>
                                        <td>09/25/2018</td>
                                        <td>$495.00</td>
                                        <td>495 points</td>
                                </tr>
                            </tbody>
                            </Table>
                            </TabPane>
                        </TabContent>
                    </Col>
                </Row>
            </Container>
    <Modal isOpen={this.state.modal1} toggle={this.toggle1} className={this.props.className}>
            <ModalBody style={styles.redeemSuccess}>
            Redeem Success
            </ModalBody>
            </Modal>
            <Modal isOpen={this.state.modal2} toggle={this.toggle2} className={this.props.className}>
            <ModalBody style={styles.redeemFail}>
            Not Enough Point
            </ModalBody>
            </Modal>
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
        textAlign: 'center', 
        marginTop: '20px', 
        color: 'white'
    },


}


const mapStateToProps = state =>{
    return{
        user: state.auth.user,
        reservations: state.allReservations
    };
}

export default connect (mapStateToProps, { getAllReservations })(Profile);
