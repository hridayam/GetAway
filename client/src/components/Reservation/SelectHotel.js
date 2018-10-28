import React, {Component} from 'react';
import {Container, Button, DropdownMenu, DropdownItem, Dropdown, DropdownToggle} from 'reactstrap';
import {Carousel} from 'react-responsive-carousel';
import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';
import './selectHotel.css'
import Scroll from '../ScrollUp';
import {search} from '../../actions/search';
import {connect} from 'react-redux';

class SelectHotel extends Component{
  constructor(props){
      super(props);

      this.state={
          dropdownOpen: false,
          hotels: [],
          chosenHotel: null
      };
      this.toggleDropdown = this.toggleDropdown.bind(this);
  }

  static getDerivedStateFromProps(props, state){
      if(props.hotels !== state.hotels){
        return{
            ...state,
            hotels: props.hotels
        }
      }
      return null;
  }

  renderHotels = () => {
    if (this.state.hotels !== null)
        return this.state.hotels.map((hotel, index) =>
            <div key={hotel.id} className="card">
                <div className="row ">
                    <div className="col-md-4">
                        { hotel.images && hotel.images.length ?
                        <Carousel autoPlay infiniteLoop>
                            {hotel.images.map((v,i) =>
                                <div>
                                    <img src={v} alt="" className="w-100"/>
                                </div>
                            )}
                        </Carousel> : <div className="align-middle" style={{height:'100%', width:'100%'}}><br/><br/><br/>No Images Available</div> }
                    </div>
                    <div className="col-md-5 px-3">
                        <div className="card-block px-3">
                            <h3 className="card-title">{hotel.name}</h3>
                            <p className="card-text"><i class="far fa-star"></i> {hotel.stars} Stars</p>
                        </div>
                    </div>
                    <div class="col-md-3 price">
                        Starting from<h3 class="reservation-price">${hotel.price.extra_bed} per night</h3>
                        <Button style={cssStyles.buttonRoom} bsStyle="primary" onClick={() => this.props.jumpToStep(1)}>Choose Hotel</Button>
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
    return(
        <div>
            <Container>
                <Scroll/>
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
    }
  }

  const mapStatetoProps = state => {
    return {
        hotels: state.search.hotels
    };
  }

  export default connect(mapStatetoProps, {search})(SelectHotel);
