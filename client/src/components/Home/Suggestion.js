import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Card, CardImg, CardText, CardBody,
    CardTitle, Button } from 'reactstrap';

export default class Suggestion extends Component {
  render() {
    return (
        <Container className = "suggestion">
            <h1 className="suggestion-title"> Step Up Your Travel Game </h1>
            <Row>
                
                <Col className="suggestion-card" sm="4">
                    <Card>
                    <CardImg top width="100%" src="http://samuiholiday.com/wp-content/uploads/2018/01/Nora-Buri-Resort-Spa-1024x683.jpg" alt="Card image cap" />
                        <CardBody>
                        <CardTitle className="card-title">DAILY DEALS</CardTitle>
                        <CardText className="card-text">Plan a last-minute weekend getaway with a deal at these GetAway hotels in the U.S.</CardText>
                        <Button className="button-suggestion">VIEW DEALS ></Button>
                        </CardBody>
                    </Card>
                </Col>

                <Col className="suggestion-card" sm="4">
                    <Card>
                        <CardImg top width="100%" src="https://t-ec.bstatic.com/images/hotel/max1024x768/537/53776472.jpg" alt="Card image cap" />
                        <CardBody>
                        <CardTitle className="card-title">TOP DESTINATIONS</CardTitle>
                        <CardText className="card-text">Discover our newest urban, resort, and lifestyle hotels.</CardText>
                        <Button className="button-suggestion">VIEW HOTELS ></Button>
                        </CardBody>
                    </Card>
                </Col>

                <Col className="suggestion-card" sm="4">
                     <Card>
                        <CardImg top width="100%" src="https://www.spittingimage.com.au/wp-content/uploads/RFT8412-1024x683.jpg" alt="Card image cap" />
                        <CardBody>
                        <CardTitle className="card-title">SPECIALITY</CardTitle>
                        <CardText className="card-text">Enjoy even more offers—like extended happy hour—at select all-inclusive resorts.</CardText>
                        <Button className="button-suggestion">LEARN MORE ></Button>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
  }
}