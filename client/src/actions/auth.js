import axios from 'axios';
// import { GET_ERRORS } from './types';
// import setAuthToken from '../setAuthToken';

import { LOGIN_USER, LOGOUT_USER, REGISTER_USER } from './types';

export const login = (data) => {
  return dispatch => {
    axios.post('http://localhost:3001/users/login', data)
      .then(res => {
        dispatch({
          type: LOGIN_USER,
          payload: res.data.user
        });
      })
      .catch(err => {
        console.log(err.response);
      })
    }
}

export const logout =() => {
    return dispatch => {
      // localStorage.removeItem('jwtToken');
      // setAuthToken(false);
      dispatch({
        type: LOGOUT_USER,
      });
    }
}

export const register = data => {
  return dispatch => {
    axios.post('/users/register', data)
      .then(res => {
        dispatch({
          type: REGISTER_USER,
          payload: res.data.user
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
}