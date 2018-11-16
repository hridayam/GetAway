import React, { Component } from 'react';
import {
        Container, Button, DropdownMenu,
        DropdownItem, Dropdown, DropdownToggle } from 'reactstrap';
import { Carousel } from 'react-responsive-carousel';

import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';
import './selectHotel.css'
import Scroll from '../ScrollUp';

import { search, selectHotel } from '../../actions/';
import { connect } from 'react-redux';

class SelectHotel extends Component{
    constructor(props){
        super(props);

        this.state={
            dropdownOpen: false,
            city: '',
            startDate: '',
            endDate: '',
            numGuests: 1,
            chosenHotel: null,
            sortOption: '',
            reservation: {},
            hotels: null
        };
        this.toggleDropdown = this. toggleDropdown.bind(this);
    }

    setSort(e) {
        this.setState({sortOption: e});
    }


    static getDerivedStateFromProps(props, state){
        if(props.reservation !== state.reservation){
            let { city, startDate, endDate, numGuests, hotels } = props.reservation;
            return{
                ...state,
                reservation: props.reservation,
                hotels,
                city,
                startDate, endDate,
                numGuests
            };
        }
        return null;
    }

  renderHotels = () => {
        if (this.state.hotels !== null)
            return this.state.hotels.map((hotel, index) =>
                <div key={hotel._id} className="card">
                    <div className="row ">
                        <div className="col-md-4">
                            { hotel.images && hotel.images.length ?
                            <Carousel autoPlay infiniteLoop>
                                {hotel.images.map((v,i) =>
                                    <div key={i}>
                                        <img src={v} alt="" className="w-100"/>
                                    </div>
                                )}
                            </Carousel> : <div className="align-middle" style={{height:'100%', width:'100%'}}><br/><br/><br/>No Images Available</div> }
                        </div>
                        <div className="col-md-5 px-3">
                            <div className="card-block px-3">
                                <h3 className="card-title">{hotel.name}</h3>
                                <p className="card-text"><i className="far fa-star"></i> {hotel.stars} Stars</p>
                            </div>
                        </div>
                        <div className="col-md-3 price">
                            Starting from<h3 className="reservation-price">${hotel.price.extra_bed} per night</h3>
                            <Button
                                style={cssStyles.buttonRoom}
                                onClick={() => {
                                    this.props.selectHotel(hotel);
                                    this.props.jumpToStep(1);
                                }}
                                >Choose Hotel</Button>
                        </div>
                    </div>
                </div>
                );
        else return null;
    }

    toggleDropdown() {
        this.setState(prevState => ({
        dropdownOpen: !prevState.dropdownOpen
        }));
    }

    render() {
        if (this.state.sortOption === "low") {
            this.state.hotels.sort((a,b) => ((a.price.extra_bed) - (b.price.extra_bed)));
        }
        else if (this.state.sortOption === "high"){
            this.state.hotels.sort((a,b) => ((b.price.extra_bed) - (a.price.extra_bed)));
        }

        return(
            <div>
            <div>
             <Button className="btn btn-deep-orange "  style={this.state.wifi?  cssStyles.activeStyle: cssStyles.inactiveStyle}
             onClick={() => this.setState({wifi: !this.state.wifi})}>
             <i class="fas fa-wifi"></i>  Free Wifi</Button>
             <Button className="btn btn-deep-orange " style={this.state.gym ?  cssStyles.activeStyle: cssStyles.inactiveStyle}
             onClick={() => this.setState({gym: !this.state.gym})}>
             <i class="fas fa-dumbbell"></i>     Gym</Button>
             <Button  className="btn btn-deep-orange "style={this.state.pool?  cssStyles.activeStyle: cssStyles.inactiveStyle}
             onClick={() => this.setState({pool: !this.state.pool})}>
             <i class="fas fa-swimmer"></i>     Pool</Button>
             <Button className="btn btn-deep-orange " style={this.state.breakfast ?  cssStyles.activeStyle: cssStyles.inactiveStyle}
             onClick={() => this.setState({breakfast: !this.state.breakfast})}>
             <i class="fas fa-utensils"></i>      Breakfast Included</Button>
             <Button className="btn btn-deep-orange " style={this.state.iron?  cssStyles.activeStyle: cssStyles.inactiveStyle}
             onClick={() => this.setState({iron: !this.state.iron})}>
             <i class="fas fa-tshirt"></i>      Iron</Button>
             <Button className="btn btn-deep-orange " style={this.state.coffeemaker?  cssStyles.activeStyle: cssStyles.inactiveStyle}
             onClick={() => this.setState({coffeemaker: !this.state.coffeemaker})}>
             <i class="fas fa-coffee"></i>     Coffee Maker</Button>
             <Button className="btn btn-deep-orange " style={this.state.tv?  cssStyles.activeStyle: cssStyles.inactiveStyle}
             onClick={() => this.setState({tv: !this.state.tv})} >
             <i class="fas fa-tv"></i>      TV</Button>
           </div>

           <Container>
               <div style={{display: 'flex'}}>
                   <Dropdown className="btn btn-deep-orange " className = 'sortbutton' isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown}>
                   <DropdownToggle style={{backgroundColor: "white", borderColor: "grey" , color: "black"}} caret>
                       Sort By:
                   </DropdownToggle>

                   <DropdownMenu>
                       <DropdownItem onClick={()=>{this.setSort("low");}}>
                       Price: Low to Hi
                       </DropdownItem>

                       <DropdownItem divider />

                       <DropdownItem onClick={()=>{this.setSort("high");}}>
                       Price: High to Low
                       </DropdownItem>
                   </DropdownMenu>
                   </Dropdown>
               </div>
                    { this.renderHotels()}
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
    },
    inactiveStyle:{
      color: 'black',
      backgroundColor: 'white',
      margin: '10px'
    },
    activeStyle:{
      color: 'white',
      background: ' linear-gradient(to right, #00cc99 0%, #33cccc 100%)',
      borderColor: 'white',
      margin: '10px'

    }
    // inactiveStyle:{
    //   color: 'black',
    //   backgroundColor: 'white',
    //   borderColor: 'white',
    //   margin: '10px'
    // },
    // activeStyle:{
    //   color: 'black',
    //   backgroundColor: 'white',
    //   borderImage: ' linear-gradient(to right, #00cc99 0%, #33cccc 100%)',
    //   borderImageSlice: 2,
    //   borderWidth: '2px',
    //   margin: '10px',
    // }
};

const mapStatetoProps = state => {
    return {
        reservation: state.reservation
    };
}

export default connect(mapStatetoProps, { search, selectHotel })(SelectHotel);
