import React, {Component} from 'react';
import {
    Container, DropdownMenu,
    DropdownItem, Dropdown, DropdownToggle,
    FormGroup, Label, Input
} from 'reactstrap';
import { MDBBtn } from 'mdbreact'

import './selectHotel.css'

import {connect} from 'react-redux';
import {selectRooms} from '../../actions';

class ChooseRoom extends Component{
    constructor(props){
        super(props);

        this.state={
            dropdownOpen: false,
            hotel: null,
            startDate: {},
            endDate: {},
            numGuests: 0,
            selectedRooms: {}
        };

        this.toggleDropdown = this.toggleDropdown.bind(this);
    }

    toggleDropdown() {
      this.setState(prevState => ({
        dropdownOpen: !prevState.dropdownOpen
      }));
    }


    static getDerivedStateFromProps(props, state){
        if(props.hotel !== state.hotel){
            return {
                ...state,
                hotel: props.hotel,
                startDate: props.startDateMoment,
                endDate: props.endDateMoment,
                numGuests: props.numGuests
            };
        }
        return null;
    }

    renderRooms = hotel => {
        let { price } = hotel;

        return Object.keys(hotel.room_images).map((k,i) => {
            let roomName = `${k.replace(/^\w/, c => c.toUpperCase())} Bed Room`;
            return (
                <div key={hotel._id} className="" style={{ margin: '2em 0px 2em 0px', padding: '2em', maxHeight: '340px' }}>
                    <div className="row ">
                        <div className="col-md-4">
                            <img key={i + '-' + hotel.room_images[k]} src={hotel.room_images[k]} alt="" className="w-100"/>
                        </div>
                        <div className="col-md-5 px-3">
                            <div className="card-block px-3">
                                <h3 className="card-title">{roomName}</h3>
                                <div className="card-text">
                                    { roomName === 'Queen Bed Room' 
                                        ? 'This queen bedroom is a bit smaller than the king bedroom, but definitely bigger than the twin bedroom'
                                        : null
                                    } 
                                    { roomName === 'King Bed Room' 
                                        ? 'This king bedroom is the biggest room out of all the room types'
                                        : null
                                    }
                                    { roomName === 'Twin Bed Room' 
                                        ? 'This twin bedroom is a bit smaller than the queen bedroom, definitely alot smaller than the king bedroom'
                                        : null
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 price">
                            <h3 className="reservation-price">${hotel.price[k]} per night</h3>
                            <FormGroup>
                                <Label for="exampleSelect">How many rooms do you need?</Label>
                                <Input
                                    onChange={e => this.setState({ selectedRooms: {[k]: e.target.value }})}
                                    type="select"
                                    name="select">
                                    <option>0</option>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                    <option>6</option>
                                    <option>7</option>
                                    <option>8</option>
                                    <option>9</option>
                                </Input>
                            </FormGroup>
                        </div>
                    </div>
                    <br/><br/>
                    <hr/>
                </div>
            );
        });
    }

    render(){
        return(
            <div>
                <Container>
                    <div className="form-control" style={{ marginTop: '2em', paddingTop: '2em' }}>
                        {this.renderRooms(this.state.hotel)}
                        <div className="text-right" style={{ padding: '0px 2em 1em 0px '}}>
                            <MDBBtn
                                onClick={() => {
                                    if (Object.keys(this.state.selectedRooms).length)
                                        this.props.selectRooms(this.state.hotel, this.state.selectedRooms);
                                    else
                                        alert('You must select at least one room to proceed.')
                                    this.props.jumpToStep(2);
                                }}
                                >
                                Choose Room(s)
                            </MDBBtn>
                        </div>
                    </div>
                    <div style={{ margin: '2em 0px 2em 0px' }}></div>
                </Container>
            </div>
        );
    }
}

const cssStyles = {
    buttonRoom:{
        backgroundColor: '#156bc1',
        border: '1px solid #156bc1',
        alignItems: 'left',
        boxShadow: 'inset 0 -2px 0 #063665',
        paddingLeft: '2rem',
        paddingRight: '2rem',
        fontSize: '0.8rem'
    }
}

const mapStatetoProps = state => {
    let { selectedHotel, startDate, endDate, numGuests } = state.reservation;
    return {
        hotel: selectedHotel,
        startDate,
        endDate,
        numGuests
    };
}

export default connect(mapStatetoProps, {selectRooms})(ChooseRoom);
