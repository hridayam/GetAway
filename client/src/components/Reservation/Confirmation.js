import React, { Component } from 'react';
import Scroll from '../ScrollUp';

export default class Suggestion extends Component {
  render() {
    return (
        <div>
            <Scroll/>
            <div className="jumbotron text-xs-center">
                <h1 class="display-3">Thank You!</h1>
                <p class="lead"><strong>Please check your email</strong> 
                for further instructions on how to complete your account setup.</p>
                <br/>
                <p>
                    Having trouble? <a href="">Contact us</a>
                </p>
                <p class="lead">
                    <a class="btn btn-primary btn-sm" href="/" role="button">Continue to homepage</a>
                </p>
            </div>

        </div>
    );
  }
}