import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';

  export default class NavBar extends Component {
    constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      navbarStyle: styles.topStyle,
      navbarClass: 'fixed-top'
    };
  }

  componentDidMount() {
    document.addEventListener('scroll', () => {
      if (window.scrollY < 100)
        this.setState({ navbarStyle : styles.topStyle, navbarClass: 'fixed-top' });
      else
        this.setState({ navbarStyle : styles.notTopStyle, navbarClass: 'fixed-top shadow' });
    });
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <div >
        <Navbar className={ this.state.navbarClass } dark expand="md" style={ this.state.navbarStyle } >
          <NavbarBrand href="/">GetAway</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/reservation/">My Reservation</NavLink>
              </NavItem>
              
              <NavItem>
                <NavLink href="/events/">Event</NavLink>
              </NavItem>
              
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Account
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    Log In
                  </DropdownItem>
                  <DropdownItem>
                    Sign Up
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

const styles = {
  topStyle: {
    height: '100px',
    backgroundColor: 'transparent'
  },
  notTopStyle: {
    height: '100px',
    backgroundColor: 'rgba(0,0,0,0.9)'
  }
}