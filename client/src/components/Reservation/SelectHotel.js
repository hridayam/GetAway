import React, { Component } from 'react';
import {
        Container, DropdownMenu,
        DropdownItem, Dropdown, DropdownToggle } from 'reactstrap';
import { MDBBtn, Button } from 'mdbreact'
import { Carousel } from 'react-responsive-carousel';
import Loader from 'react-loader-spinner';
import Weather from '../Weather';

import './selectHotel.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";

import { search, selectHotel } from '../../actions/';
import { connect } from 'react-redux';

class SelectHotel extends Component{
    constructor(props){
        super(props);

        this.state={
            dropdownOpen: false,
            city: '',
            startDate: {},
            endDate: {},
            numGuests: 1,
            chosenHotel: null,
            sortOption: '',
            reservation: {},
            hotels: null,
            isLoading: false,
            wifi: false,
            gym: false,
            pool: false,
            complimentary_breakfast: false,
            coffee: false,
            laundry: false,
            free_parking: false
        };
        this.toggleDropdown = this.toggleDropdown.bind(this);
    }

    setSort(e) {
        this.setState({sortOption: e});
    }

    static getDerivedStateFromProps(props, state){
        if(props.reservation !== state.reservation){
            let { city, startDate, endDate, numGuests, hotels, isLoading } = props.reservation;
            return {
                ...state,
                reservation: props.reservation,
                hotels,
                city,
                startDate, endDate,
                numGuests,
                isLoading
            };
        }
        return null;
    }

  renderHotels = () => {
        if (this.state.hotels !== null && !this.state.loading)
            return this.state.hotels.filter(hotel => (!this.state.wifi || (this.state.wifi && hotel.amenities.wifi))
            && (!this.state.gym || (this.state.gym && hotel.amenities.gym))
            && (!this.state.pool || (this.state.pool && hotel.amenities.pool))
            && (!this.state.complimentary_breakfast || (this.state.complimentary_breakfast && hotel.amenities.complimentary_breakfast))
            && (!this.state.coffee || (this.state.coffee && hotel.amenities.coffee))
            && (!this.state.laundry || (this.state.laundry && hotel.amenities.laundry))
            &&(!this.state.free_parking || (this.state.free_parking && hotel.amenities.free_parking))
            )
            .map((hotel, index) =>
                <div key={hotel._id} className="form-control" style={{ margin: '2em 0px 2em 0px', padding: '2em', height: '300px' }}>
                    <div className="row ">
                        <div className="col-md-4">
                            { hotel.images && hotel.images.length ?
                            <Carousel dynamicHeight autoPlay infiniteLoop
                                showArrows={true}
                                showIndicators={false}
                                showStatus={false}
                                showThumbs={false}
                            >
                                {hotel.images.map((v,i) =>
                                    <div key={v}>
                                        <img src={v} alt="" className="w-100" />
                                    </div>
                                )}
                            </Carousel> : <div className="align-middle" style={{height:'100%', width:'100%'}}><br/><br/><br/>No Images Available</div> }
                        </div>
                        <div className="col-md-5 px-3">
                            <div className=" px-3">
                                <h3 className="">{hotel.name}</h3>
                                <p className="">{hotel.stars === 5? <div><i class="fas fa-star"></i> <i class="fas fa-star"></i> <i class="fas fa-star"></i> <i class="fas fa-star"></i> <i class="fas fa-star"></i> </div>: ""}
                                {hotel.stars === 4? <div><i class="fas fa-star"></i> <i class="fas fa-star"></i> <i class="fas fa-star"></i> <i class="fas fa-star"></i> </div>: ""}
                                {hotel.stars ===3? <div><i class="fas fa-star"></i> <i class="fas fa-star"></i> <i class="fas fa-star"></i>  </div> : ""}
                                {hotel.stars ===2? <div><i class="fas fa-star"></i> <i class="fas fa-star"></i> </div>: ""}
                                {hotel.stars ===1? <i class="fas fa-star"></i> : ""}</p>
                                  <p style={{fontWeight: '800', color: '#484848'}}> Amenities Included: </p>
                                  <p style={{}}>{hotel.amenities.wifi? <i class="fas fa-wifi"></i> : ""}
                                  {hotel.amenities.gym? <i class="fas fa-dumbbell" style={{marginLeft: "14px", color: '#484848'}}></i> : ""}
                                  {hotel.amenities.pool?  <i class="fas fa-swimmer" style={{marginLeft: "14px", color: '#484848'}}></i> : ""}
                                  {hotel.amenities.complimentary_breakfast? <i class="fas fa-utensils" style={{marginLeft: "14px", color: '#484848'}}></i>  : ""}
                                  {hotel.amenities.coffee? <i class="fas fa-coffee" style={{marginLeft: "14px", color: '#484848'}}></i> : ""}
                                  {hotel.amenities.laundry? <i class="fas fa-tshirt" style={{marginLeft: "14px", color: '#484848'}}></i>  : ""}
                                  {hotel.amenities.free_parking? <i class="fas fa-car" style={{marginLeft: "14px", color: '#484848'}}></i> : ""}</p>
                            </div>
                        </div>
                        <div className="col-md-3 price">
                            Starting from<h3 className="reservation-price">${hotel.price.twin} per night</h3>
                            <MDBBtn
                                onClick={() => {
                                    this.props.selectHotel(hotel);
                                    this.props.jumpToStep(1);
                                }}
                                >Choose Hotel</MDBBtn>
                        </div>
                    </div>
                </div>
                );
        else if (this.state.loading) {
            return (
                <Loader type="Plane" color="#008080" height={100} width={100} />
            );
        }
        else return null;
    }

    toggleDropdown() {
        this.setState(prevState => ({
        dropdownOpen: !prevState.dropdownOpen
        }));
    }

    render() {
        if (this.state.sortOption === "low") {
            this.state.hotels.sort((a,b) => ((a.price.twin) - (b.price.twin)));
        }
        else if (this.state.sortOption === "high"){
            this.state.hotels.sort((a,b) => ((b.price.twin) - (a.price.twin)));
        }
        else if(this.state.sortOption === 'rating'){
            this.state.hotels.sort((a,b) => ((b.stars - a.stars)))
        }

        return(
            <div>
                <div>
                    <Button   style={this.state.wifi?  cssStyles.activeStyle: cssStyles.inactiveStyle}
                    onClick={() => this.setState({wifi: !this.state.wifi})}>
                    <i className="fas fa-wifi"></i>  Free Wifi</Button>
                    <Button style={this.state.gym ?  cssStyles.activeStyle: cssStyles.inactiveStyle}
                    onClick={() => this.setState({gym: !this.state.gym})}>
                    <i className="fas fa-dumbbell"></i>     Gym</Button>
                    <Button style={this.state.pool?  cssStyles.activeStyle: cssStyles.inactiveStyle}
                    onClick={() => this.setState({pool: !this.state.pool})}>
                    <i class="fas fa-swimmer"></i>     Pool</Button>
                    <Button style={this.state.complimentary_breakfast ?  cssStyles.activeStyle: cssStyles.inactiveStyle}
                    onClick={() => this.setState({complimentary_breakfast: !this.state.complimentary_breakfast})}>
                    <i class="fas fa-utensils"></i>      Breakfast Included</Button>
                    <Button style={this.state.laundry?  cssStyles.activeStyle: cssStyles.inactiveStyle}
                    onClick={() => this.setState({laundry: !this.state.laundry})}>
                    <i class="fas fa-tshirt"></i>      Laundry</Button>
                    <Button style={this.state.coffee?  cssStyles.activeStyle: cssStyles.inactiveStyle}
                    onClick={() => this.setState({coffee: !this.state.coffee})}>
                    <i class="fas fa-coffee"></i>     Coffee Maker</Button>
                    <Button style={this.state.free_parking?  cssStyles.activeStyle: cssStyles.inactiveStyle}
                    onClick={() => this.setState({free_parking: !this.state.free_parking})} >
                    <i class="fas fa-car"></i>    Free Parking</Button>
                </div>

            <Container>
                <div style={{display: 'flex'}}>
                    <Dropdown className = 'sortbutton' isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown}>
                    <DropdownToggle outline color = 'default'  caret>
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

                        <DropdownItem divider />

                        <DropdownItem onClick={()=>{this.setSort("rating");}}>
                        Highest Rating
                        </DropdownItem>

                    </DropdownMenu>
                    </Dropdown>
                </div>
                <br/><br/>
                <Weather city={this.state.city}/>
                { this.renderHotels() }
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
    activeStyle:{
      color: 'white',
      background: ' linear-gradient(to right, #DD5E89 30%, #F7BB97 100%)',
      borderColor: 'white',
      margin: '10px'
    },
    inactiveStyle:{
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
