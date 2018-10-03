import React, { Component } from 'react';
import { BrowserRouter, Route} from 'react-router-dom';

import NavBar from './components/NavBar';
import Home from './components/Home/Home';
import Footer from './components/Footer';
import Profile from './components/Profile/Profile';
import Reservation from './components/Reservation/Reservation';
import Login from './components/Login';

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
              <Route exact path='/profile' component={Profile}/>
              <Route exact path = '/reservation' component ={Reservation}/>
            </div>
        </BrowserRouter>

        <div className = 'App-footer'>
          <Footer/>
        </div>
      </div>
    );
  }
}

const styles = {
}

export default App;
