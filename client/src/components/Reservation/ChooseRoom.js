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

        return hotel.rooms.map((r,i) => 
            <div className="card">
                <div className="row ">
                    <div className="col-md-4">
                        { r.images.length ? 
                            <Carousel autoPlay infiniteLoop>
                                { r.images.map((v,i) => 
                                    <img src={v} alt="" className="w-100"/>
                                )}
                            </Carousel> : <div><br/><br/>No Images Available</div>
                        }
                    </div>
                    <div className="col-md-5 px-3">
                        <div className="card-block px-3">
                            <h3 className="card-title">{r.bed_type.replace(/^\w/, c => c.toUpperCase())} Bed Room</h3>
                            <div className="card-text">
                                Wifi, HD Television, Coffee Maker, and Refrigerator come standard.
                                <br/><br/>
                                This room includes {r.beds} {r.bed_type} bed(s).
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 price">
                        <h3 className="reservation-price">${r.beds*price[r.bed_type]} per night</h3>
                        <FormGroup>
                            <Label for="exampleSelect">How many rooms do you need?</Label>
                            <Input 
                                onChange={e => this.setState({ selectedRooms: {[r.bed_type]: e.target.value }})}
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
                                    this.props.selectRooms(hotel, { [r.bed_type]: 1});
                                this.props.jumpToStep(2);
                            }}
                            >
                            Choose Room
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    render(){
        console.log(this.state)
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
