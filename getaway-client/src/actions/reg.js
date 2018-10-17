
import axios from 'axios';
import { GET_ERRORS } from './types';
import setAuthToken from '../setAuthToken';
import { REGISTER_USER } from './types';
export const register = (data) => {
    return dispatch => {
      axios.post('http://localhost:3001/users/register', data)
        .then(res => {
          console.log(res)
          dispatch({
            type: REGISTER_USER,
            payload: res.data.user
          });
        })
        .catch(err => {
          console.log('right here');
          console.log(err.response);
        })
      }
  }