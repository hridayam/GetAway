import React, {Component} from 'react';
import { Container, Row, Col, Form, Input, Button, Breadcrumb } from 'reactstrap';

export default class Footer extends Component{
  render(){
    return(
      <footer style={styles.footerStyle}>
        <Container>
          <Row style={styles.rowStyle}> 
            <Col xs="6" sm="4">
              <h1 className="text-uppercase font-weight-bold" style={{marginBottom: '30px', fontFamily:'Allura',textAlign: 'left'}}>GetAway</h1>
                <p style={{fontSize:'20px', textAlign: 'left'}}>As one of the world’s top hospitality companies, 
                <strong> GetAway</strong> remains committed to caring 
                for people so they can be their best.
                <a href='/aboutus'> Learn more</a>
                </p>
            </Col>

            <Col xs="6" sm="4" style={{textAlign:'left'}}>
              <h5 className="text-uppercase font-weight-bold" style={{marginBottom: '30px'}}>Contact</h5>
                <p><i class="fa fa-home mr-3"/>San Jose, CA 95192, US</p>
                <p><i class="fa fa-envelope mr-3"/>info@getaway.com</p>
                <p><i class="fa fa-phone mr-3"/>+ 01 408 GET AWAY</p>
                <p><i class="fa fa-print mr-3"/> + 01 234 567 89</p>
            </Col>

            <Col sm="4">
              <h5 className="text-uppercase font-weight-bold" style={{marginBottom: '30px'}}>Stay tuned</h5>

              <div className="mb-5 flex-center" >
                <a  href="#" style = {{color:'black'}}>
                  <i className="fa fa-facebook fa-lg mr-md-5 mr-3 fa-2x"> </i>
                </a>
                <a  href="#" style = {{color:'black'}}> 
                  <i className="fa fa-twitter fa-lg mr-md-5 mr-3 fa-2x"> </i>
                </a>
                <a href="#" style = {{color:'black'}}>
                  <i className="fa fa-google-plus fa-lg mr-md-5 mr-3 fa-2x"> </i>
                </a>
                <a href="#" style = {{color:'black'}}>
                <i className="fa fa-instagram fa-lg mr-md-5 mr-3 fa-2x"> </i>
                </a>
              </div>

              <h5 style={{float:'left'}}> Subscribe Us:</h5>
              <Form className="input-group">
                <Input type="text" class="form-control form-control-sm" placeholder="Your email" aria-label="Your email" aria-describedby="basic-addon2"/>
                <div className="input-group-append">
                  <Button className="btn btn-sm btn-outline-white" type="button">Sign up</Button>
                </div>
              </Form>
            </Col>
          </Row>
        </Container>
        
        <div style={{backgroundColor: '#8c7b75', color:'white', width: '100%',}}>
        <br></br><h6>&reg; 2018 GetAway</h6>  <br></br>
        </div>
        
        
      </footer>
    );
  }
}

const styles = {
  footerStyle: {
    color: 'black',
    flex: 1, 
    fontFamily: 'Lato',
  }, 
  rowStyle:{
    marginTop: '40px',
    marginBottom: '40px'
  }

}