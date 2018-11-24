import React, {Component} from 'react';
import {
    Container, Button, DropdownMenu, 
    DropdownItem, Dropdown, DropdownToggle, 
    FormGroup, Label, Input
} from 'reactstrap';
import {Carousel} from 'react-responsive-carousel';
import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';
import './selectHotel.css'
import Scroll from '../ScrollUp';
import {connect} from 'react-redux';
import {selectRooms} from '../../actions';

class ChooseRoom extends Component{
    constructor(props){
        super(props);

        this.state={
            dropdownOpen: false,
            hotel: null,
            startDate: 0,
            endDate: 0,
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
                startDate: 0,
                endDate: 0,
                numGuests: 0
            };
        }
        return null;
    }

    renderRooms = hotel => {
        let { price } = hotel;

        return Object.keys(hotel.room_images).map((k,i) => {
            let roomName = `${k.replace(/^\w/, c => c.toUpperCase())} Bed Room`;
            return (
            <div key={i}className="card">
                <div className="row ">
                    <div className="col-md-4">
                        <img key={i + '-' + hotel.room_images[k]} src={hotel.room_images[k]} alt="" className="w-100"/>
                    </div>
                    <div className="col-md-5 px-3">
                        <div className="card-block px-3">
                            <h3 className="card-title">{roomName}</h3>
                            <div className="card-text">
                                This {roomName} is cool!
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
                        <Button 
                            style={cssStyles.buttonRoom} 
                            color="info" 
                            size="lg" 
                            onClick={() => { 
                                if (Object.keys(this.state.selectedRooms).length)
                                    this.props.selectRooms(hotel, this.state.selectedRooms);
                                else
                                    this.props.selectRooms(hotel, { [k]: 1});
                                this.props.jumpToStep(2);
                            }}
                            >
                            Choose Room
                        </Button>
                    </div>
                </div>
            </div>
            );
        });
    }

    render(){
        console.log(this.props);
        return(
            <div>
                <Container>
                <div>
                <Dropdown className = 'sortbutton' size="lg" isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown}>
                <DropdownToggle style={{backgroundColor: "white", borderColor: "grey" , color: "black"}} caret>
                    Sort By:
                </DropdownToggle>

                <DropdownMenu>
                    <DropdownItem onClick={()=>{this.setSort("low");}}>
                    Price: Low to High
                    </DropdownItem>

                    <DropdownItem divider />

                    <DropdownItem onClick={()=>{this.setSort("high");}}>
                    Price: High to Low
                    </DropdownItem>
                </DropdownMenu>
                </Dropdown>
                </div>
                {this.renderRooms(this.state.hotel)}
                <br></br>
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
