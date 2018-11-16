import React, { Component } from "react";
import { Container, Row, Col,
    Card, CardBody, CardImage, CardTitle, CardText} from 'mdbreact';
import Team from './Team'

export default class aboutUs extends Component {

        render() {
          return (
              <Container>
                  <Row>
                    <hr style={styles.line}></hr>
                      <Col xs="6" style={styles.header}>

                        <h1 style ={{marginTop:'100px', marginBottom:'100px'}}> WE ARE FAMILY </h1>
                      </Col>

                      <Col xs="6" style={styles.information}>
                        <p  style ={{marginTop:'100px', marginBottom:'100px'}}>
                        As we continue to grow, we don’t lose sight of what’s most important—people. 
                        GetAway is a company that was built by family. 
                        It’s a workplace where coworkers become friends. 
                        Every day we care for our guests. 
                        Care is at the heart of our business, 
                        and it’s this distinct guest experience that makes GetAway one of the world’s best hospitality brands.
                        </p>
                      </Col>
                      
                      <hr style={styles.line}></hr>
                  </Row>

                  <Row>
                    <Team/>
                  </Row>

              </Container>
          );
        }
    }
    const styles = {
        header: {
            backgroundColor: '#fff44f', 
            color : '#787878', 
            fontFamily: 'Lato',
            textAlign: 'center',
            fontSize: '40px',
        },
        information:{
            backgroundColor: '#787878', 
            color : '#fff44f', 
            fontSize: '20px',
            textAlign: 'center',
        },

        line: {
            border: '10px solid #fff44f',
            borderRadius: '2px',
            width: '100%'
        }
    }