import React, {Component} from 'react';
import {Container } from 'reactstrap';


export default class ChooseRoom extends Component{
  render(){
    return(
        <div>
            <Container>
            <div class="card" style={ styles.card}>
                <div class="row ">
                    <div class="col-md-4">
                        <img src="https://placeholdit.imgix.net/~text?txtsize=38&txt=400%C3%97400&w=400&h=400" class="w-100"/>
                    </div>
                    <div class="col-md-8 px-3">
                        <div class="card-block px-3">
                            <h4 class="card-title">Lorem ipsum dolor sit amet</h4>
                            <p class="card-text">Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                            <p class="card-text">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                            <a href="#" class="btn btn-info">Read More</a>
                        </div>
                    </div>
                </div>
            </div>

            <div class="card" style={ styles.card}>
                <div class="row ">
                    <div class="col-md-4">
                        <img src="https://placeholdit.imgix.net/~text?txtsize=38&txt=400%C3%97400&w=400&h=400" class="w-100"/>
                    </div>
                    <div class="col-md-8 px-3">
                        <div class="card-block px-3">
                            <h4 class="card-title">Lorem ipsum dolor sit amet</h4>
                            <p class="card-text">Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                            <p class="card-text">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                            <a href="#" class="btn btn-info">Read More</a>
                        </div>
                    </div>
                </div>
            </div>

            <div class="card" style={ styles.card}>
                <div class="row ">
                    <div class="col-md-4">
                        <img src="https://placeholdit.imgix.net/~text?txtsize=38&txt=400%C3%97400&w=400&h=400" class="w-100"/>
                    </div>
                    <div class="col-md-8 px-3">
                        <div class="card-block px-3">
                            <h4 class="card-title">Lorem ipsum dolor sit amet</h4>
                            <p class="card-text">Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                            <p class="card-text">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                            <a href="#" class="btn btn-info">Read More</a>
                        </div>
                    </div>
                </div>
            </div>
            <br></br>
            </Container>
        </div>
    );
  }
}

const styles = {
    card: {
      marginTop: '40px'
    },

  }