import axios from 'axios';
import { GET_ERRORS } from './types';
import setAuthToken from '../setAuthToken';

import { LOGIN_USER } from './types';

export const login = (data) => {
  return dispatch => {
    axios.post('http://localhost:3001/users/login', data)
      .then(res => {
        console.log(res)
        dispatch({
          type: LOGIN_USER,
          payload: res.data.user
        });
      })
      .catch(err => {
        console.log('right here');
        console.log(err.response);
      })
    }
}

// export const login = (email, password) => {
//     return {
//         type: 'LOGIN',
//         email: email,
//         password: password
//     };
// };
//
// export const logout = () => {
//     return {
//         type: 'LOGOUT'
//     };
// };
//
// export const loginUser = (user) => dispatch => {
//     axios.post('/api/users/login', user)
//             .then(res => {
//                 console.log(res.data);
//             })
//             .catch(err => {
//                 dispatch({
//                     type: GET_ERRORS,
//                     payload: err.response.data
//                 });
//             });
// }
