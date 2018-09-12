import React, { Component } from 'react';
import { BrowserRouter, Route} from 'react-router-dom';

import Home from './components/Home';
import Footer from './components/Footer';

//import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div >
        <BrowserRouter>
            <div id='routes'>
              <Route exact path='/' component={Home} />
              
            </div>
        </BrowserRouter>
       
        <div className = 'App-footer'>
          <Footer/>
        </div>
      </div>
    );
  }
}

export default App;
