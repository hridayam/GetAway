import React, { Component } from "react";
import { Container, Row, Col,
     Card, CardBody, CardImage, CardTitle, CardText} from 'mdbreact';
import Scroll from './ScrollUp';
import ReactCardFlip from 'react-card-flip';
export default class aboutUs extends Component {
    constructor() {
        super();
        this.state = {
          isFlipped1: false,
          isFlipped2: false,
          isFlipped3: false,
          isFlipped4: false,
          isFlipped5: false,
          isFlipped6: false,
          isFlipped7: false,
          isFlipped8: false,
          isFlipped9: false,
          isFlipped10: false
        };
        this.handleClick1 = this.handleClick1.bind(this);
        this.handleClick2 = this.handleClick2.bind(this);
        this.handleClick3 = this.handleClick3.bind(this);
        this.handleClick4 = this.handleClick4.bind(this);
        this.handleClick5 = this.handleClick5.bind(this);
        this.handleClick6 = this.handleClick6.bind(this);
        this.handleClick7 = this.handleClick7.bind(this);
        this.handleClick8 = this.handleClick8.bind(this);
        this.handleClick9 = this.handleClick9.bind(this);
        this.handleClick10 = this.handleClick10.bind(this);
      }
     
      handleClick1(e) {
        e.preventDefault();
        this.setState(prevState => ({ isFlipped1: !prevState.isFlipped1 }));
      }
      handleClick2(e) {
        e.preventDefault();
        this.setState(prevState => ({ isFlipped2: !prevState.isFlipped2 }));
      }
      handleClick3(e) {
        e.preventDefault();
        this.setState(prevState => ({ isFlipped3: !prevState.isFlipped3 }));
      }
      handleClick4(e) {
        e.preventDefault();
        this.setState(prevState => ({ isFlipped4: !prevState.isFlipped4 }));
      }
      handleClick5(e) {
        e.preventDefault();
        this.setState(prevState => ({ isFlipped5: !prevState.isFlipped5 }));
      }
      handleClick6(e) {
        e.preventDefault();
        this.setState(prevState => ({ isFlipped6: !prevState.isFlipped6 }));
      }
      handleClick7(e) {
        e.preventDefault();
        this.setState(prevState => ({ isFlipped7: !prevState.isFlipped7 }));
      }
      handleClick8(e) {
        e.preventDefault();
        this.setState(prevState => ({ isFlipped8: !prevState.isFlipped8 }));
      }
      handleClick9(e) {
        e.preventDefault();
        this.setState(prevState => ({ isFlipped9: !prevState.isFlipped9 }));
      }
      handleClick10(e) {
        e.preventDefault();
        this.setState(prevState => ({ isFlipped10: !prevState.isFlipped10 }));
      }
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
                    <ReactCardFlip  style = {styles.card}
                    isFlipped={this.state.isFlipped1}>
                    <Card
                    onClick={this.handleClick1}
                    key="front">
                        <CardImage
                        className="img-fluid"  style = {styles.imgFluid} src="http://2.bp.blogspot.com/-zyKlWanN5dI/Vj1Cd2jlWSI/AAAAAAAADL8/7IrG3rb9j1I/s1600/Anonymous-hacker-profile-picture.jpg" alt="Card image cap" />
                        <CardBody >
                            <CardTitle>Nhat Trinh</CardTitle>
                            <CardText>Project Manager</CardText>
                        </CardBody>
                    </Card>
 
                    <Card onClick={this.handleClick1}
                     key="back">
                     <CardBody >
                            <CardTitle>Nhat Trinh</CardTitle>
                            <CardText>Dedicated leader who guide the team to successful</CardText>
                    </CardBody>
                    </Card>
                 </ReactCardFlip>
                </Col>
                <Col xs={12} md={4} lg={3}>
                    <ReactCardFlip  style = {styles.card}
                    isFlipped={this.state.isFlipped2}>
                    <Card onClick={this.handleClick2}
                    key="front">
                        <CardImage className="img-fluid" style = {styles.imgFluid} src="https://files.slack.com/files-pri/TCESXV1DL-FEGTCHY9X/img_20180327_152354.jpg" alt="Card image cap" />
                        <CardBody >
                            <CardTitle>Hridayam</CardTitle>
                            <CardText>Technical Lead</CardText>
                        </CardBody>
                    </Card>
 
                    <Card  onClick={this.handleClick2}
                    key="back">
                     <CardBody >
                            <CardTitle>Hridayam</CardTitle>
                            <CardText>Work as the friendly second leader to help people with any coding problems</CardText>
                    </CardBody>
                    </Card>
                 </ReactCardFlip>   
                </Col>
                <Col xs={12} md={4} lg={3}>
                
                    <ReactCardFlip  style = {styles.card}
                    isFlipped={this.state.isFlipped3}>
                    <Card onClick={this.handleClick3}
                    key="front">
                        <CardImage className="img-fluid" style = {styles.imgFluid} src="https://facebook.github.io/react/logo-og.png" alt="Card image cap" />
                        <CardBody >
                            <CardTitle>Paul</CardTitle>
                            <CardText>Software Developer</CardText>
                        </CardBody>
                    </Card>
 
                    <Card  onClick={this.handleClick3}
                    key="back">
                     <CardBody >
                            <CardTitle>Paul</CardTitle>
                            <CardText>Front-end developer who can work indepently</CardText>
                    </CardBody>
                    </Card>
                 </ReactCardFlip>
                   
                   
                </Col>
                
                <Col xs={12} md={4} lg={3}>
                
                    <ReactCardFlip  style = {styles.card}
                    isFlipped={this.state.isFlipped4}>
                    <Card onClick={this.handleClick4}
                    key="front">
                        <CardImage className="img-fluid" style = {styles.imgFluid} src="https://files.slack.com/files-pri/TCESXV1DL-FEJGMH2KH/0.jpg" alt="Card image cap" />
                        <CardBody >
                            <CardTitle>Alejandro Lopez</CardTitle>
                            <CardText>Documentation</CardText>
                        </CardBody>
                    </Card>
 
                    <Card  onClick={this.handleClick4}
                    key="back">
                     <CardBody >
                            <CardTitle>Alejandro Lopez</CardTitle>
                            <CardText>Keeps track of the team progress through out the development process</CardText>
                    </CardBody>
                    </Card>
                 </ReactCardFlip>
                       
                   
                </Col>
                <div style ={{marginBottom:450}}></div>
                <Col xs={12} md={4} lg={3}>
                
                    <ReactCardFlip  style = {styles.card}
                    isFlipped={this.state.isFlipped5}>
                    <Card onClick={this.handleClick5}
                    key="front">
                        <CardImage className="img-fluid" style = {styles.imgFluid} src="https://img.purch.com/w/660/aHR0cDovL3d3dy5saXZlc2NpZW5jZS5jb20vaW1hZ2VzL2kvMDAwLzA4OC85MTEvb3JpZ2luYWwvZ29sZGVuLXJldHJpZXZlci1wdXBweS5qcGVn" alt="Card image cap" />
                        <CardBody >
                            <CardTitle>Jennifer Nguyen</CardTitle>
                            <CardText>Software Developer</CardText>
                        </CardBody>
                    </Card>
 
                    <Card  onClick={this.handleClick5}
                    key="back">
                     <CardBody >
                            <CardTitle>Jennifer Nguyen</CardTitle>
                            <CardText>Front-end developer who can work well with other teammember</CardText>
                    </CardBody>
                    </Card>
                 </ReactCardFlip>
                     
                    
                </Col>

                <Col xs={12} md={4} lg={3}>
               
                    <ReactCardFlip  style = {styles.card}
                    isFlipped={this.state.isFlipped6}>
                    <Card onClick={this.handleClick6}
                    key="front">
                        <CardImage className="img-fluid" style = {styles.imgFluid} src="https://files.slack.com/files-pri/TCESXV1DL-FEK7B3ZGX/image_from_ios.jpg" alt="Card image cap" />
                        <CardBody >
                            <CardTitle>Truc Vo</CardTitle>
                            <CardText>Product Owner</CardText>
                        </CardBody>
                    </Card>
 
                    <Card  onClick={this.handleClick6}
                    key="back">
                     <CardBody >
                            <CardTitle>Truc Vo</CardTitle>
                            <CardText>Works on majority of the UI of the project</CardText>
                    </CardBody>
                    </Card>
                 </ReactCardFlip>
                    
                    
                </Col>

                <Col xs={12} md={4} lg={3}>
                
                    <ReactCardFlip  style = {styles.card}
                     isFlipped={this.state.isFlipped7}>
                    <Card 
                    onClick={this.handleClick7}
                    key="front">
                        <CardImage className="img-fluid" style = {styles.imgFluid} src="https://academy.growthx.com/wp-content/uploads/sites/2/2017/01/featured_ux-870x380.jpg" alt="Card image cap" />
                        <CardBody >
                            <CardTitle>Tuan Anh Le</CardTitle>
                            <CardText>UX Designer</CardText>
                        </CardBody>
                    </Card>
 
                    <Card  onClick={this.handleClick7}
                    key="back">
                     <CardBody >
                            <CardTitle>Tuan Anh Le</CardTitle>
                            <CardText>The person who makes the UI look professional</CardText>
                    </CardBody>
                    </Card>
                 </ReactCardFlip>
                    
                   
                </Col>

                <Col xs={12} md={4} lg={3}>
                
                    <ReactCardFlip  style = {styles.card}
                    isFlipped={this.state.isFlipped8}>
                    <Card onClick={this.handleClick8}
                    key="front">
                        <CardImage className="img-fluid" style = {styles.imgFluid} src="https://gauss-development.com/wp-content/uploads/2017/02/skills-of-a-good-software-tester.png" alt="Card image cap" />
                        <CardBody >
                            <CardTitle>Raghav Gupta</CardTitle>
                            <CardText>Software Tester</CardText>
                        </CardBody>
                    </Card>
 
                    <Card  onClick={this.handleClick8}
                    key="back">
                     <CardBody >
                            <CardTitle>Raghav Gupta</CardTitle>
                            <CardText>Tester for the project through each development cycle</CardText>
                    </CardBody>
                    </Card>
                 </ReactCardFlip>
                      
                    
                </Col> 
                <div style ={{marginBottom:450}}></div>
                <Col xs={12} md={4} lg={3}>
              
                    <ReactCardFlip  style = {styles.card}
                    isFlipped={this.state.isFlipped9}>
                    <Card onClick={this.handleClick9}
                    key="front">
                        <CardImage className="img-fluid" style = {styles.imgFluid} src="https://files.slack.com/files-pri/TCESXV1DL-FEJM1GUCX/screen_shot_2018-12-03_at_12.44.39_am.png" alt="Card image cap" />
                        <CardBody >
                            <CardTitle>Luis Reyes</CardTitle>
                            <CardText>Assistant Tester</CardText>
                        </CardBody>
                    </Card>
 
                    <Card  onClick={this.handleClick9}
                    key="back">
                     <CardBody >
                            <CardTitle>Luis Reyes</CardTitle>
                            <CardText>The creative logos and icons creater for the project</CardText>
                    </CardBody>
                    </Card>
                 </ReactCardFlip>
                     
                </Col> 

                <Col xs={12} md={4} lg={3}>
                
                    <ReactCardFlip  style = {styles.card}
                    isFlipped={this.state.isFlipped10}>
                    <Card onClick={this.handleClick10}
                    key="front">
                        <CardImage className="img-fluid" style = {styles.imgFluid} src="https://pmcvariety.files.wordpress.com/2018/05/discord-logo.jpg?w=1000&h=563&crop=1" alt="Card image cap" />
                        <CardBody >
                            <CardTitle>Thomas Luong</CardTitle>
                            <CardText>Assistant Documentation</CardText>
                        </CardBody>
                    </Card>
 
                    <Card  onClick={this.handleClick10}
                    key="back">
                     <CardBody >
                            <CardTitle>Thomas Luong</CardTitle>
                            <CardText>Works on the hotel images for the project</CardText>
                    </CardBody>
                    </Card>
                 </ReactCardFlip>
                   
                   
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
        background: ' center no-repeat fixed url(https://www.beachwalkresortfl.com/i/SITE_170317_16231421_5SMU1/content/app/EEEA0629-C770-029B-33E743A8044CF851.jpg)'
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
    },
    imgFluid:{
        height: '190px',
        width: '250px'
    }
}
