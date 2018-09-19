import React, { Component } from 'react';
import { Table } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap'
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText,Collapse, CardBody} from 'reactstrap';
import {Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import '../picture/slide/2.jpg';
import '../css/Home.css';
import Suggestion from '../Home/Suggestion';

export default class Profile extends Component{

  constructor(props) {
      super(props);

      this.toggle = this.toggle.bind(this);
      this.state = {
        activeTab: '1',

      };
    }

    toggle(tab) {
      if (this.state.activeTab !== tab) {
        this.setState({
          activeTab: tab
        });
      }
    }


  render(){
    return(
    <div>
    <div className="background-image2">
    <div class="row" style= {styles.profileStyle}>
   </div>


<Container className='text-block2'>
<Row>
<Col sm={{ size: 3, offset:2}} >
<h1 style={styles.nameStyle}>Hello! John Tran</h1>
</Col>
</Row>
<Row>
<Col sm={{ size: 3,offset:2}}>
<img src="http://ssl.gstatic.com/accounts/ui/avatar_2x.png" style={styles.imageStyles}/>
<label for="files" class="btn" style= {styles.uploadpic}>Change Picture</label>
<input style={styles.uploadStyle} type="file" class="text-center center-block file-upload"/>

<Table size="sm" style={styles.tableborder}>
     <thead>
       <tr>
         <th  style= {styles.headerStyle}>Contact Information</th>
       </tr>
     </thead>
     <tbody>
       <tr>
         <td style={styles.tableStyle}>Email: johnshotel@gmail.com</td>
       </tr>
       <tr>
         <td style={styles.tableStyle}>Mobile: 408-555-5555</td>
       </tr>
       <tr>
         <td style={styles.tableStyle}>Address: 837 Disney Road, San Jose, CA, 95128</td>
       </tr>
     </tbody>
   </Table>

   <Table size="sm" style={styles.tableborder}>
        <thead>
          <tr>
            <th style= {styles.headerStyle}>Rewards</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td  style= {styles.tableStyle}>29 points</td>
          </tr>

        </tbody>
      </Table>

</Col>





<Col sm={{ size: 30, offset: 0}}>

<Nav tabs style={{borderBottomColor: "transparent", marginLeft: '23px'}} >
         <NavItem style= {styles.tabStyle}>
           <NavLink
             onClick={() => { this.toggle('1'); }}
           >
             Current Reservations
           </NavLink>
         </NavItem>
         <NavItem style= {styles.tabStyle}>
           <NavLink
             onClick={() => { this.toggle('2'); }}
           >
             Past Reservations
           </NavLink>
         </NavItem>

         <NavItem style= {styles.tabStyle}>
           <NavLink
             onClick={() => { this.toggle('3'); }}
           >
             Edit Profile
           </NavLink>
         </NavItem>

       </Nav>
       <TabContent activeTab={this.state.activeTab}>
         <TabPane tabId="1">
           <Row>
             <Col sm={{ size: 40, offset: 1}}>
               <Table style={styles.tableStyle}>
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
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>12/25/2018</td>
            <td>Los Angeles</td>
            <td>Single</td>
            <td>1</td>
            <td>Active</td>
          </tr>

        </tbody>
      </Table>

             </Col>
           </Row>
         </TabPane>
         <TabPane tabId="2">
           <Row>
              <Col sm={{ size: 50}}>
              You have no past reservations
           </Col>
           </Row>
         </TabPane>

         <TabPane tabId="3">
           <Row>
              <Col sm={{ size: 50, offset: 1}}>


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
       </TabContent>
       </Col>


</Row>
<br/>


  </Container>

    </div>

    </div>
    );
  }
}

const styles = {
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
    backgroundColor: '#4682b4',
    color: 'white',
    fontWeight: 'normal',
    border: '2px solid black'
  },
  tableStyle:{
    backgroundColor: '#f5f5f5',
    marginTop: '10px',
    textAlign: 'left'

  },
  tabStyle:{
    backgroundColor: '#4682b4',
    color: 'white',
    borderRadius: '10px',
    marginLeft: '10px'
  },
  nameStyle:{
    color:'white',
    fontFamily:'Georgia',
    fontSize: '30px',
    fontWeight:'thick'
  },
  uploadStyle:{
    visibility: 'hidden'
  },
  tableborder: {
    border: "2px solid black",
    borderRadius: "10px"
  },
  uploadpic :{
    color: '#f5f5f5'
  }
}
