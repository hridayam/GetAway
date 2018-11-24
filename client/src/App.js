import React, { Component } from 'react';
import { BrowserRouter, Route} from 'react-router-dom';

import NavBar from './components/NavBar';
import Home from './components/Home/Home';
import Foot from './components/Foot';
import MyReservation from './components/Profile/MyReservation';
import Reservation from './components/Reservation/Reservation';
import AboutUs from './components/AboutUs';
import Register from './components/Register';
import GuestRoute from './components/Routes/GuestRoute';
import UserRoute from './components/Routes/UserRoute';

//import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div >
        <NavBar />
        <BrowserRouter>
            <div id='routes' style={ styles.routeStyle }>
              <Route exact path='/' component={Home} />
              <UserRoute exact path='/myreservation' component={MyReservation}/>
              <Route exact path = '/reservation' component ={Reservation}/>
              <Route exact path = '/aboutus' component ={AboutUs}/>
              <GuestRoute exact path = '/register' component ={Register}/>
            </div>
        </BrowserRouter>

        <div className = 'App-footer'>
          <Foot/>
        </div>
      </div>
    );
  }
}

const styles = {
  routeStyle: {}
};

export default App;
