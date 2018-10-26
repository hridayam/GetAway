import React, {Component} from 'react';
import {Container, Button, DropdownMenu, DropdownItem, Dropdown, DropdownToggle} from 'reactstrap';
import {Carousel} from 'react-responsive-carousel';
import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';
import './selectHotel.css'
import Scroll from '../ScrollUp';

export default class selectHotel extends Component{
  constructor(props){
      super(props);
  
      this.state={
          dropdownOpen: false
      };
      this.toggleDropdown = this.toggleDropdown.bind(this);
  }

  toggleDropdown() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }
  
  render(){
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
            <div class="card">
                <div class="row ">
                    <div class="col-md-4">
                        <Carousel autoPlay infiniteLoop>
                            <div>
                                <img src="https://placeholdit.imgix.net/~text?txtsize=38&txt=400%C3%97400&w=400&h=400" class="w-100"/>
                            </div>
                            <div>
                                <img src="https://placeholdit.imgix.net/~text?txtsize=38&txt=400%C3%97400&w=400&h=400" class="w-100"/>
                            </div>
                            <div>
                                <img src="https://placeholdit.imgix.net/~text?txtsize=38&txt=400%C3%97400&w=400&h=400" class="w-100"/>
                            </div>
                            <div>
                                <img src="https://placeholdit.imgix.net/~text?txtsize=38&txt=400%C3%97400&w=400&h=400" class="w-100"/>
                            </div>
                            <div>
                                <img src="https://placeholdit.imgix.net/~text?txtsize=38&txt=400%C3%97400&w=400&h=400" class="w-100"/>
                            </div>
                            <div>
                                <img src="https://placeholdit.imgix.net/~text?txtsize=38&txt=400%C3%97400&w=400&h=400" class="w-100"/>
                            </div>
                            <div>
                                <img src="https://placeholdit.imgix.net/~text?txtsize=38&txt=400%C3%97400&w=400&h=400" class="w-100"/>
                            </div>
                            <div>
                                <img src="https://placeholdit.imgix.net/~text?txtsize=38&txt=400%C3%97400&w=400&h=400" class="w-100"/>
                            </div>
                        </Carousel>
                    </div>
                    <div class="col-md-5 px-3">
                        <div class="card-block px-3">
                            <h3 class="card-title">GetAway(Name of Hotels)</h3> 
                            <p class="card-text">description</p>
                        </div>
                    </div>
                    <div class="col-md-3 price">
                        <h1 class="reservation-price">$Price</h1>
                        <Button style={cssStyles.buttonRoom} bsStyle="primary" onClick={() => this.props.jumpToStep(1)}>Choose Hotel</Button>
                    </div>
                </div>  
            </div>
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