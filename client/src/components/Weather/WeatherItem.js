import React, { Component } from 'react';

export default class WeatherItem extends Component{
  constructor(props) {
    super(props);

    this.date = this.getDate(this.props.day.dt);
    this.icon = this.props.day.weather[0].icon;
  }

  convertTemp = kelvin => parseInt(((kelvin - 273.15)* 1.8000 + 32.00), 10)
  
  getDate = ts => {
    const daysMap = {
      "0":"Sunday",
      "1":"Monday",
      "2":"Tuesday",
      "3":"Wednesday",
      "4":"Thursday",
      "5":"Friday",
      "6":"Saturday"
    };
    
    const monthsMap = {
      "0":"Jan",
      "1":"Feb",
      "2":"Mar",
      "3":"Apr",
      "4":"May",
      "5":"June",
      "6":"July",
      "7":"Aug",
      "8":"Sept",
      "9":"Oct",
      "10":"Nov",
      "11":"Dec"
    };

    var date = new Date(ts * 1000);
    var day = daysMap[date.getDay()]
    var month = monthsMap[date.getMonth()] + ' ' + date.getDate();
    
    return day + ', ' + month;
  }

  render() {
    return (
      <div>
        <img src={require('./images/weather-icons/' + this.icon + '.svg')} alt='' />
        <h5>{this.date}</h5>
      </div>
    );
  }
}

