import axios from 'axios';
// import { GET_ERRORS } from './types';
// import setAuthToken from '../setAuthToken';

import { LOGIN_USER, LOGOUT_USER, REGISTER_USER } from './types';

export const login = (data) => {
    return dispatch => {
        axios.post('http://localhost:3001/users/login', data)
        .then(res => {
            localStorage.token = res.data.token;
            localStorage.data = JSON.stringify(res.data.user);
            console.log(res.data)
            dispatch(userLoggedIn({token: res.data.token, user: res.data.user}));
        })
        .catch(err => {
            console.log(err.response);
        })
    }
}

export const userLoggedIn = data => ({
    type: LOGIN_USER,
    payload: data
});

export const logout =() => {
    return dispatch => {
        localStorage.removeItem('token');
        localStorage.removeItem('data');
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