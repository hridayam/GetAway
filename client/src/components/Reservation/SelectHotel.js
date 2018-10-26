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
          hotels: []
      };
      this.toggleDropdown = this.toggleDropdown.bind(this);
      this.createCardHotels = this.createCardHotels.bind(this);
  }

  static getDerivedStateFromProps(state, props){
      if(props.hotels !== state.hotels){
        return{
            ...state,
            hotels: props.hotels
        }
      }
      return null;
  }

  createCardHotels = () => {
     return this.state.hotels.map((hotel) => {
        return(
            <div key={hotel.id} className="card">
                <div className="row ">
                    <div className="col-md-4">
                        <Carousel autoPlay infiniteLoop>
                            <div>
                                <img src="https://placeholdit.imgix.net/~text?txtsize=38&txt=400%C3%97400&w=400&h=400" className="w-100"/>
                            </div>
                            <div>
                                <img src="https://placeholdit.imgix.net/~text?txtsize=38&txt=400%C3%97400&w=400&h=400" className="w-100"/>
                            </div>
                            <div>
                                <img src="https://placeholdit.imgix.net/~text?txtsize=38&txt=400%C3%97400&w=400&h=400" className="w-100"/>
                            </div>
                            <div>
                                <img src="https://placeholdit.imgix.net/~text?txtsize=38&txt=400%C3%97400&w=400&h=400" className="w-100"/>
                            </div>
                            <div>
                                <img src="https://placeholdit.imgix.net/~text?txtsize=38&txt=400%C3%97400&w=400&h=400" className="w-100"/>
                            </div>
                            <div>
                                <img src="https://placeholdit.imgix.net/~text?txtsize=38&txt=400%C3%97400&w=400&h=400" className="w-100"/>
                            </div>
                            <div>
                                <img src="https://placeholdit.imgix.net/~text?txtsize=38&txt=400%C3%97400&w=400&h=400" className="w-100"/>
                            </div>
                            <div>
                                <img src="https://placeholdit.imgix.net/~text?txtsize=38&txt=400%C3%97400&w=400&h=400" className="w-100"/>
                            </div>
                        </Carousel>
                    </div>
                    <div className="col-md-5 px-3">
                        <div className="card-block px-3">
                            <h3 className="card-title">{hotel.name}</h3> 
                            <p className="card-text">description</p>
                        </div>
                    </div>
                    <div className="col-md-3 price">
                        <h1 className="reservation-price">$Price</h1>
                        <Button style={cssStyles.buttonRoom} bsStyle="primary">Choose Hotel</Button>
                    </div>
                </div>  
            </div>
            )}
        )
    }

  toggleDropdown() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  render(){
      console.log(this.state)
      console.log(this.props)
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
            {this.state.hotels.map((hotel) => {
            <div key={hotel.id} className="card">
                <div className="row ">
                    <div className="col-md-4">
                        <Carousel autoPlay infiniteLoop>
                            <div>
                                <img src="https://placeholdit.imgix.net/~text?txtsize=38&txt=400%C3%97400&w=400&h=400" className="w-100"/>
                            </div>
                            <div>
                                <img src="https://placeholdit.imgix.net/~text?txtsize=38&txt=400%C3%97400&w=400&h=400" className="w-100"/>
                            </div>
                            <div>
                                <img src="https://placeholdit.imgix.net/~text?txtsize=38&txt=400%C3%97400&w=400&h=400" className="w-100"/>
                            </div>
                            <div>
                                <img src="https://placeholdit.imgix.net/~text?txtsize=38&txt=400%C3%97400&w=400&h=400" className="w-100"/>
                            </div>
                            <div>
                                <img src="https://placeholdit.imgix.net/~text?txtsize=38&txt=400%C3%97400&w=400&h=400" className="w-100"/>
                            </div>
                            <div>
                                <img src="https://placeholdit.imgix.net/~text?txtsize=38&txt=400%C3%97400&w=400&h=400" className="w-100"/>
                            </div>
                            <div>
                                <img src="https://placeholdit.imgix.net/~text?txtsize=38&txt=400%C3%97400&w=400&h=400" className="w-100"/>
                            </div>
                            <div>
                                <img src="https://placeholdit.imgix.net/~text?txtsize=38&txt=400%C3%97400&w=400&h=400" className="w-100"/>
                            </div>
                        </Carousel>
                    </div>
                    <div className="col-md-5 px-3">
                        <div className="card-block px-3">
                            <h3 className="card-title"></h3> 
                            <p className="card-text">{hotel.name}</p>
                        </div>
                    </div>
                    <div className="col-md-3 price">
                        <h1 className="reservation-price">$Price</h1>
                        <Button style={cssStyles.buttonRoom} bsStyle="primary">Choose Hotel</Button>
                    </div>
                </div>  
            </div>
            })}
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