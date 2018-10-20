import React, { Component } from "react";
import { Container, Row, Col, CardImg, Card, CardBody,
    CardTitle, CardSubtitle} from 'reactstrap';

export default class AboutUs extends Component {
  render() {
    return (
    <div>
    <div style = {styles.background}>
      <Container style = {styles.aboutus}>
        <Row> 
          <h1>We are FAMILY</h1>
            <p >
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
        <Row>
          <Container style = {styles.aboutus}>
          <h1>Meet The Team</h1>
            <Row>
              <Col xs={12} md={4} lg={3}>
                <Card style = {styles.card}>
                    <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
                    <CardBody>
                        <CardTitle>Nhat Trinh</CardTitle>
                        <CardSubtitle>Project Manager</CardSubtitle>
                    </CardBody>
                </Card>
              </Col>
              
              <Col xs={12} md={4} lg={3}>
                <Card style = {styles.card}>
                    <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
                    <CardBody>
                        <CardTitle>Hridayam Bakshi</CardTitle>
                        <CardSubtitle>Technical Lead</CardSubtitle>
                    </CardBody>
                </Card>   
              </Col>
 
              <Col xs={12} md={4} lg={3}>
                <Card style = {styles.card}>
                    <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
                    <CardBody>
                        <CardTitle>Paul Nguyen</CardTitle>
                        <CardSubtitle>Software Developer</CardSubtitle>
                    </CardBody>
                </Card>   
              </Col>

              <Col xs={12} md={4} lg={3}>
                <Card style = {styles.card}>
                    <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
                    <CardBody>
                        <CardTitle>Alejandro Lopez</CardTitle>
                        <CardSubtitle>Documentation</CardSubtitle>
                    </CardBody>
                </Card>   
              </Col>

              <Col xs={12} md={4} lg={3}>
                <Card style = {styles.card}>
                    <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
                    <CardBody>
                        <CardTitle>Jennifer Nguyen</CardTitle>
                        <CardSubtitle>Software Developer</CardSubtitle>
                    </CardBody>
                </Card>   
              </Col>

              <Col xs={12} md={4} lg={3}>
                <Card style = {styles.card}>
                    <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
                    <CardBody>
                        <CardTitle>Truc Vo</CardTitle>
                        <CardSubtitle>Product Owner</CardSubtitle>
                    </CardBody>
                </Card>   
              </Col>

              <Col xs={12} md={4} lg={3}>
                <Card style = {styles.card}>
                    <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
                    <CardBody>
                        <CardTitle>Tuan Anh Le</CardTitle>
                        <CardSubtitle>UX Designer</CardSubtitle>
                    </CardBody>
                </Card>   
              </Col>

              <Col xs={12} md={4} lg={3}>
                <Card style = {styles.card}>
                    <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
                    <CardBody>
                        <CardTitle>Raghav Gupta</CardTitle>
                        <CardSubtitle> Software Tester </CardSubtitle>
                    </CardBody>
                </Card>   
              </Col> 

              <Col xs={12} md={4} lg={3}>
                <Card style = {styles.card}>
                    <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
                    <CardBody>
                        <CardTitle>Luis Reyes</CardTitle>
                        <CardSubtitle> Assistant Tester</CardSubtitle>
                    </CardBody>
                </Card>   
              </Col> 

              <Col xs={12} md={4} lg={3}>
                <Card style = {styles.card}>
                    <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
                    <CardBody>
                        <CardTitle>Thomas Luong</CardTitle>
                        <CardSubtitle> Assistant Documentation</CardSubtitle>
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
    background:{
        backgroundColor: 'black',
    },

    aboutus: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: '100px',
    },

    card:{
        marginBottom:'40px',
    }
}
