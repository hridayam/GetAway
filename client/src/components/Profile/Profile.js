import React, { Component } from 'react';
import { Table } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap'
import {TabContent, TabPane, Nav, NavItem, NavLink, Button} from 'reactstrap';
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
            rewardPoint:29,
            modal1: false,
            modal2: false,
            reservations: []
        };
    }

    componentDidMount() {
        console.log("will mount")
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
            this.setState({
            activeTab: tab
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
                {/* <Row>
                    <Col xs="6" sm="4">
                        <h1 style={styles.nameStyle}>Hello! {this.props.user.name}</h1>
                    </Col>
                </Row>
                <Row>
                    <Col xs="4" >
                        <img alt="" src="http://ssl.gstatic.com/accounts/ui/avatar_2x.png" style={styles.imageStyles}/>
                        <br/>
                        <Button for="files" color="secondary" >Change Picture</Button>
                        <input style={styles.uploadStyle} type="file" class="text-center center-block file-upload"/>

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
                    </Col> */}
                <Row style = {styles.textBlock}>
                    <Col sm="12" md={{ size: 6, offset: 3 }}>
                        <Nav tabs style={{borderBottomColor: "transparent"}} >
                            <NavItem style= {styles.tabStyle}>
                                <NavLink onClick={() => { this.toggle('1'); }}>
                                    My Reservations
                                </NavLink>
                            </NavItem>

                            <NavItem style= {styles.tabStyle}>
                                <NavLink onClick={() => { this.toggle('2'); }}>
                                    Edit Profile
                                </NavLink>
                            </NavItem>

                            <NavItem style= {styles.tabStyle}>
                                <NavLink onClick={() => { this.toggle('3'); }}>
                                    Rewards
                                </NavLink>
                            </NavItem>
                        </Nav>
                        
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
        backgroundColor: '#2e908a',
        color: 'white',
        borderRadius: '10px',
        marginLeft: '10px',
        marginTop :'20px',
        marginBottom: '10px',
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
