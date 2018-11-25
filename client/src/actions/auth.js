import axios from 'axios';
// import { GET_ERRORS } from './types';
// import setAuthToken from '../setAuthToken';

import { LOGIN_USER, LOGOUT_USER } from './types';

export const login = (data, cb) => {
    return dispatch => {
        loginUser(data, dispatch, cb);
    }
}

export const userLoggedIn = data => ({
    type: LOGIN_USER,
    payload: data
});

const loginUser = (data, dispatch, cb) => {
    axios.post('http://localhost:3001/users/login', data)
        .then(res => {
            localStorage.token = res.data.token;
            localStorage.data = JSON.stringify(res.data.user);

            dispatch(userLoggedIn({token: res.data.token, user: res.data.user}));
            cb();
        })
        .catch(err => {
            console.log(err.response);
         
        })
};

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
            loginUser({ email: data.email, password: data.password }, dispatch);
        })
        .catch(err => {
            console.log(err);
        });
    }
}