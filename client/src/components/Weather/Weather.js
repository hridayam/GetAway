import React, { Component } from 'react';
import axios from 'axios';
import { Row, Col } from 'mdbreact';
import Loader from 'react-loader-spinner';

import WeatherItem from './WeatherItem';

export default class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      forecastData: [],
      loading: true
    }

    this.URL = 'http://api.openweathermap.org/data/2.5/';
    this.API_KEY = 'b714ec74bbab5650795063cb0fdf5fbe';
  }

  componentDidMount() {
    if (String(this.props.city).length)
      this.makeRequest(this.props.city);
  }

  componentWillReceiveProps(nextProps) {
    if (String(nextProps.city).length)
      this.makeRequest(this.props.city);
  }

  makeRequest = city => {
    this.setState({ loading: true });
    this.getForecast(city);
  }

  prepRouteParams = queryStringData => {
    return Object.keys(queryStringData)
      .map(key => {
        return key + '=' + encodeURIComponent(queryStringData[key]);
      }).join('&')
  }

  prepUrl = (type, queryStringData) => {
    return this.URL + type + '?' + this.prepRouteParams(queryStringData);
  }

  getQueryStringData = city => {
    return {
      q: city,
      type: 'accurate',
      APPID: this.API_KEY,
      cnt: 5
    }
  }

  getForecast = city => {
    var queryStringData = this.getQueryStringData(city);
    var url = this.prepUrl('forecast/daily', queryStringData)

    return axios.get(url)
      .then(res => {
        this.setState({
          forecastData: res.data.list,
          loading: false
        });
      })
      .catch(err => {
        console.log(err);
      })
  }

  render() {
    return this.state.loading !== true
      ? <div className="form-control">
          <h2 className='forecast-header'>Weather Forecast for {this.props.city}</h2>
          <hr/>
          <br/>
          <Row>
            <Col md="1">{null}</Col>
            {this.state.forecastData ? this.state.forecastData.map((v,i) => 
              <Col sm="4" md="2">
                <WeatherItem key={v.dt} day={v} />
              </Col>
            ) : null}
          </Row>
        </div>
      : <Loader type="Plane" color="#008080" height={100} width={100} />
  }
}