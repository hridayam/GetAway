import React, {Component} from 'react';
import { Col, Container, Row } from "mdbreact";
import { NavLink } from 'react-router-dom';
import '../components/css/Home.css';

export default class Foot extends Component{
  render(){
    return(
      <footer style={styles.footerStyle}>
        <Container style={{paddingTop: '30px'}}>
          <Row style={styles.rowStyle}> 
            <Col sm="12" md="4" style={{fontSize:'20px', textAlign: 'left'}}>
              <h2 className="text-uppercase font-weight-bold" style={{marginBottom: '20px', fontFamily:'Allura'}}>GetAway</h2>
                <p>As one of the world’s top hospitality companies,
                <strong> GetAway</strong> remains committed to caring
                for people so they can be their best.
                <a href="/aboutus"> Learn more</a>
                </p>
                
            </Col>
            <br/>
            <Col sm="12" md="4" style={{textAlign:'center'}}>
              <h5 className="text-uppercase font-weight-bold" style={{marginBottom: '30px'}}>Contact</h5>
                <p><i className="fa fa-home mr-3"/>San Jose, CA 95192, US</p>
                <p><i className="fa fa-envelope mr-3"/>info@getaway.com</p>
                <p><i className="fa fa-phone mr-3"/>+ 01 408 GET AWAY</p>
                <p><i className="fa fa-print mr-3"/> + 01 234 567 89</p>
            </Col>
            <br/>
            <Col sm="12" md="4">
              <h5 className="text-uppercase font-weight-bold" style={{marginBottom: '30px'}}>Stay tuned</h5>

              <div className="row" style={{padding:10}}>
                 <a  className="col-xs-6 col-sm-6 col-md-3" href="#" style = {{color:'#3b5998',marginTop:9}}>
                   <i className="fa fa-facebook fa-lg mr-md-5 mr-3 fa-2x"> </i>
                 </a>
                 <a  className="col-xs-6 col-sm-6 col-md-3" href="#" style = {{color:'#00acee',marginTop:9}}>
                   <i className="fa fa-twitter fa-lg mr-md-5 mr-3 fa-2x"> </i>
                 </a>
                 <a className="col-xs-6 col-sm-6 col-md-3" href="#" style = {{color:'#DD4B39',marginTop:9}}>
                   <i className="fa fa-google-plus fa-lg mr-md-5 mr-3 fa-2x"> </i>
                 </a>
                 <a className="col-xs-6 col-sm-6 col-md-3" href="#" style = {{color: 'black'}}>
                 <i className="fab fa-instagram"></i>
                </a>
              </div>
              <br/><br/>
              <h5 style={{float:'left'}}> Subscribe to Our Emails:</h5>
              <form className="input-group">
                <input type="text" className="form-control form-control-sm" placeholder="Your email" aria-label="Your email" aria-describedby="basic-addon2"/>
                <div className="input-group-append">
                  <button className="btn btn-sm btn-outline-white" type="button">Sign up</button>
                </div>
              </form>
            </Col>
            <br/>
          </Row>
        </Container>

        <div className="footer-copyright text-center py-3">
          <Container fluid>
          &reg; 2018 GetAway
          </Container>
        </div>
       </footer>
    );
  }
}

const styles = {
  footerStyle: {
    color: 'white',
    flex: 1, 
    fontFamily: 'Lato',
    backgroundColor: '#262626'
  },
  rowStyle:{
    marginTop: '40px',
    marginBottom: '40px'
  }
}
