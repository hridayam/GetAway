import React, { Component } from "react";
import { Container, Row, Col,
     Card, CardBody, CardImage, CardTitle, CardText} from 'mdbreact';
import Scroll from './ScrollUp';

export default class aboutUs extends Component {
  render() {
    return (
    <div style={styles.rootDiv}>
        <Scroll/>
        <div style = {styles.background}>
            <div style={ styles.overlay}>
                <Container>
                    <Row style = {styles.header}> 
                        <h1>We are FAMILY</h1>
                        <p className="text-center">
                        As we continue to grow, we don’t lose sight of what’s most important—people. 
                        GetAway is a company that was built by family. 
                        It’s a workplace where coworkers become friends. 
                        Every day we care for our guests. 
                        Care is at the heart of our business, 
                        and it’s this distinct guest experience that makes GetAway one of the world’s best hospitality brands.
                        </p>
                    </Row>
                </Container>
            </div>
        </div>
        <Row>
            <Container style = {styles.aboutUs}>
                <h1>Meet The Team</h1>
                <Row>
                <Col xs={12} md={4} lg={3}>
                    <Card  style = {styles.card}>
                        <CardImage className="img-fluid" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
                        <CardBody >
                            <CardTitle>Nhat Trinh</CardTitle>
                            <CardText>Project Manager</CardText>
                        </CardBody>
                    </Card>
                </Col>
                
                <Col xs={12} md={4} lg={3}>
                    <Card style = {styles.card}>
                        <CardImage className="img-fluid" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
                        <CardBody>
                            <CardTitle>Hridayam Bakshi</CardTitle>
                            <CardText>Technical Lead</CardText>
                        </CardBody>
                    </Card>   
                </Col>
    
                <Col xs={12} md={4} lg={3}>
                    <Card style = {styles.card}>
                        <CardImage className="img-fluid" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
                        <CardBody>
                            <CardTitle>Paul Nguyen</CardTitle>
                            <CardText>Software Developer</CardText>
                        </CardBody>
                    </Card>   
                </Col>

                <Col xs={12} md={4} lg={3}>
                    <Card style = {styles.card}>
                        <CardImage className="img-fluid" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
                        <CardBody>
                            <CardTitle>Alejandro Lopez</CardTitle>
                            <CardText>Documentation</CardText>
                        </CardBody>
                    </Card>   
                </Col>

                <Col xs={12} md={4} lg={3}>
                    <Card style = {styles.card}>
                        <CardImage className="img-fluid" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
                        <CardBody>
                            <CardTitle>Jennifer Nguyen</CardTitle>
                            <CardText>Software Developer</CardText>
                        </CardBody>
                    </Card>   
                </Col>

                <Col xs={12} md={4} lg={3}>
                    <Card style = {styles.card}>
                        <CardImage className="img-fluid" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
                        <CardBody>
                            <CardTitle>Truc Vo</CardTitle>
                            <CardText>Product Owner</CardText>
                        </CardBody>
                    </Card>   
                </Col>

                <Col xs={12} md={4} lg={3}>
                    <Card style = {styles.card}>
                        <CardImage className="img-fluid" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
                        <CardBody>
                            <CardTitle>Tuan Anh Le</CardTitle>
                            <CardText>UX Designer</CardText>
                        </CardBody>
                    </Card>   
                </Col>

                <Col xs={12} md={4} lg={3}>
                    <Card style = {styles.card}>
                        <CardImage className="img-fluid" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
                        <CardBody>
                            <CardTitle>Raghav Gupta</CardTitle>
                            <CardText> Software Tester </CardText>
                        </CardBody>
                    </Card>   
                </Col> 

                <Col xs={12} md={4} lg={3}>
                    <Card style = {styles.card}>
                        <CardImage className="img-fluid" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
                        <CardBody>
                            <CardTitle>Luis Reyes</CardTitle>
                            <CardText> Assistant Tester</CardText>
                        </CardBody>
                    </Card>   
                </Col> 

                <Col xs={12} md={4} lg={3}>
                    <Card style = {styles.card}>
                        <CardImage className="img-fluid" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
                        <CardBody>
                            <CardTitle>Thomas Luong</CardTitle>
                            <CardText> Assistant Documentation</CardText>
                        </CardBody>
                    </Card>   
                </Col> 

                </Row>
            </Container>
        </Row>
    </div>
    );
  }
}

const styles = {
    rootDiv: {
        overflowX: 'hidden',
        flex: 1,
        height: '100%',
        width: '100%'
    },
    background: {
        background: ' right no-repeat fixed url(https://hiverhq.com/blog/wp-content/uploads/2015/12/EE1.jpg)'
    },
    overlay: {
        flex: 1,
        zIndex: 2,
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    header: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: '300px',
      paddingBottom: '100px',
      color: 'white'
    },
    aboutUs: {
        paddingTop: '100px'
    },
    card:{
        marginBottom:'30px',
    }
}
