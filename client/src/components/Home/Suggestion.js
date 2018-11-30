import React, { Component } from 'react';
import { Container, Row, Col } from 'mdbreact';
import { Card, CardImage, CardText, CardBody,
    CardTitle, Button, View } from 'mdbreact';

export default class Suggestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 0
        };
    }
    

  render() {
    return (
        <Container className = "suggestion" >
            <h1 className="suggestion-title"> Step Up Your Travel Game </h1>
            <Row >
                <Col className="suggestion-card wow fadeInUpBig" data-wow-duration="0.5s" sm="12" lg="4">
                    <Card style={{height: '30rem'}}>
                        <View zoom>
                            <CardImage top width="100%" src="http://samuiholiday.com/wp-content/uploads/2018/01/Nora-Buri-Resort-Spa-1024x683.jpg" alt="Card image cap" />
                        </View>
                        <CardBody>
                        <CardTitle className="card-title">DAILY DEALS</CardTitle>
                        <CardText className="card-text" >Plan a last-minute weekend getaway with a deal at these GetAway hotels in the U.S.</CardText>
                        <Button className="button-suggestion">VIEW DEALS ></Button>
                        </CardBody>
                    </Card>
                </Col>

                <Col className="suggestion-card wow fadeInUpBig" data-wow-duration="0.5s" data-wow-delay="0.4s" sm="12" lg="4">
                    <Card style={{height: '30rem'}}>
                        <View zoom>
                            <CardImage top width="100%" src="https://t-ec.bstatic.com/images/hotel/max1024x768/537/53776472.jpg" alt="Card image cap" />
                        </View>    
                        <CardBody>
                        <CardTitle className="card-title">TOP DESTINATIONS</CardTitle>
                        <CardText className="card-text " >Discover our newest urban, resort, and lifestyle hotels. </CardText>
                        <Button className="button-suggestion">VIEW HOTELS ></Button>
                        </CardBody>
                    </Card>
                </Col>

                <Col className="suggestion-card wow fadeInUpBig" data-wow-duration="0.5s" data-wow-delay="0.8s" sm="12" lg="4" >
                     <Card style={{height: '30rem'}}>
                        <View zoom>
                            <CardImage top width="100%" src="https://www.spittingimage.com.au/wp-content/uploads/RFT8412-1024x683.jpg" alt="Card image cap" />
                        </View>
                        <CardBody>
                        <CardTitle className="card-title">SPECIALTY</CardTitle>
                        <CardText className="card-text" >Enjoy even more offers—like extended happy hour—at select all-inclusive resorts.</CardText>
                        <Button className="button-suggestion">LEARN MORE ></Button>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
  }
}
