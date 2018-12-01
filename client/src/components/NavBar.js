import React, { Component } from 'react';
import {
  Collapse, Navbar, NavbarToggler,
  NavbarBrand, Nav, NavItem,
  NavLink
} from 'reactstrap';
import Login from './Login';
import Register from './Register';
import logo from "./picture/getaway_logo.png";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';


  class NavBar extends Component {
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

  static getDerivedStateFromProps(props, state) {
     if (state.user !== props.user){
       return {
         user: props.user
       };
     }
     return null;
   }

  render() {
    if(this.state.user){
   return (
     <div >
       <Navbar className="fixed-top" dark expand="lg" style={ this.state.navbarStyle } >
         <NavbarBrand href="/">
           <img src={logo} alt="logo" style={{width:'250px', height: '100px', paddingTop: '5px', float: 'left'}} />
         </NavbarBrand>
         <NavbarToggler onClick={this.toggle} style={{ display: 'center' }}/>
         <Collapse style={{ margin: 0 }} isOpen={this.state.isOpen} navbar>

           <Nav className="ml-auto" navbar style={ this.state.navStyle }>
             <NavItem>
             <NavLink href="/myreservation/">My Reservation</NavLink>
             </NavItem>
             <NavItem>
               <Login />
             </NavItem>
             <NavItem>
               <NavLink href="/aboutus/">About Us</NavLink>
             </NavItem>
           </Nav>
         </Collapse>
       </Navbar>
     </div>
   );
 } else{
   return (
     <div >
       <Navbar className="fixed-top" dark expand="lg" style={ this.state.navbarStyle } >
          <NavbarBrand href="/">
            <img src={logo} alt="logo" style={{width:'250px', height: '100px', paddingTop: '5px', float: 'left'}} />
          </NavbarBrand>
         <NavbarToggler onClick={this.toggle} />
         <Collapse style={{ margin: 0 }} isOpen={this.state.isOpen} navbar>

           <Nav className="ml-auto" navbar style={ this.state.navStyle }>
             <NavItem>
               <Register/>
             </NavItem>
             <NavItem>
               <Login />
             </NavItem>
             <NavItem>
               <NavLink href="/aboutus/">About Us</NavLink>
             </NavItem>
           </Nav>
         </Collapse>
       </Navbar>
     </div>
   );
 }
  }
}

const styles = {
  transparentStyle: {
    height: '100px',
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingTop: '0px',
    boxShadow: 'none'
  },
  blackStyle: {
    height: '100px',
    backgroundColor: 'rgba(0,0,0,0.9)',
    boxShadow: 'none'
  }
}

const mapStateToProps = state => {
    if(!!state.auth.token){
        return {
            isLoggedIn: !!state.auth.token,
            user: state.auth.user
        };
    }
    return {};
}

export default connect (mapStateToProps)(NavBar);
