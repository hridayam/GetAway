import React, { Component } from 'react';


export default class Suggestion extends Component {
  render() {
    return (
        <div>
            <div className="jumbotron text-xs-center" style ={{display:'inline-block', marginTop: '20px'}}>
                <h1 className="display-3">Thank You!</h1>
                <p className="lead"><strong>Please check your email</strong> for further instructions on how to complete your account setup.</p>
                <br/>
                <p>
                    Having trouble? <a href="/aboutus">Contact us</a>
                </p>
                <p className="lead">
                    <a className="btn btn-info btn-sm" href="/" role="button">Continue to homepage</a>
                </p>
            </div>

        </div>
    );
  }
}
