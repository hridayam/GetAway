import React, { Component } from 'react';
import {
  Collapse, Navbar, NavbarToggler,
  NavbarBrand, Nav, NavItem,
  NavLink
} from 'reactstrap';
import Login from './Login'

  export default class NavBar extends Component {
    constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    
    this.state = {
      isOpen: false,
      navbarStyle: styles.transparentStyle,
      navStyle: { backgroundColor: 'transparent' },
      loginClicked: false
    };

    this.initialWindowWidth = window.outerWidth;

    this.scrollListener = () => {
      if (window.scrollY < 100)
        this.setState({ 
          navbarStyle : styles.transparentStyle
        });
      else
        this.setState({ 
          navbarStyle : styles.blackStyle,
      });
    };

    this.resizeListener = () => {
      if (window.outerWidth < this.initialWindowWidth * 0.69 && !this.state.isOpen) 
        this.setState({ navStyle: { backgroundColor: 'transparent' }});
      else if (window.outerWidth > this.initialWindowWidth * 0.69 && this.state.isOpen)
        this.setState({ navStyle: { backgroundColor: 'transparent', isOpen: false }});
    }
  }

  componentDidMount() {
    document.addEventListener('scroll', this.scrollListener);
    window.addEventListener('resize', this.resizeListener);
  }
  
  componentWillUnmount() {
    document.removeEventListener('scroll', this.scrollListener);
    document.removeEventListener('resize', this.resizeListener);
  }
   toggle() {
    if (this.state.isOpen)
      this.setState({
        isOpen: !this.state.isOpen,
        navStyle: { backgroundColor: 'transparent' }
      });
    else
      this.setState({
        isOpen: !this.state.isOpen,
        navStyle: { backgroundColor: 'rgba(0,0,0,0.9)' }
      });
  }

  render() {
    return (
      <div >
        <Navbar className="fixed-top" dark expand="lg" style={ this.state.navbarStyle } >
          <NavbarBrand href="/">GetAway</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse style={{ margin: 0 }} isOpen={this.state.isOpen} navbar>
            
            <Nav className="ml-auto" navbar style={ this.state.navStyle }>
              <NavItem>
                <NavLink href="/reservation/">Reservation</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/events/">Event</NavLink>
              </NavItem>
              <NavItem>
                <Login />
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

const styles = {
  transparentStyle: {
    height: '100px',
    backgroundColor: 'transparent',
    paddingTop: '0px',
  },
  blackStyle: {
    height: '100px',
    backgroundColor: 'rgba(0,0,0,0.9)'
  }
}