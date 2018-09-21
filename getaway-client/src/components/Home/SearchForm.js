import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';


export default class SearchForm extends Component {
  render() {
    return (
        <Container className="text-block">
            <h1 className="title"> Take a break </h1>
            <Form className="form-wrapper">
                <Row>
                    <Col sm="12">
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                            <Input className="search-place" bsSize="lg" placeholder="Where do you want to go?" />
                        </FormGroup>
                    </Col>
                </Row>
                
                <Row className="search-date">
                    <Col xs="6" sm="4">
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                            <Label for="exampleDate"> Depart:  </Label>
                            <Input type="date" name="date" id="exampleDate" placeholder="date placeholder" />
                        </FormGroup>
                    </Col>

                    <Col xs="6" sm="4">
                        <FormGroup inline className="mb-2 mr-sm-2 mb-sm-0">
                            <Label for="exampleDate"> Arrival:  </Label>
                            <Input type="date" name="date" id="exampleDate" placeholder="date placeholder" />
                        </FormGroup>
                    </Col>
                    
                    <Col sm="4">
                        <FormGroup inline className="mb-2 mr-sm-2 mb-sm-0">
                            <Label for="exampleDate"> Guests:  </Label>
                            <Input type="select" name="select" id="exampleSelect" placeholder="sm">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Input>
                        </FormGroup>
                    </Col>
                </Row>

                <Button className="search-button">Search</Button>
            </Form>
        </Container>
    );
  }
}