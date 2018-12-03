import axios from 'axios';
// import { GET_ERRORS } from './types';
// import setAuthToken from '../setAuthToken';

import { LOGIN_USER, LOGOUT_USER, ADMIN_LOGIN, ADMIN_LOGOUT } from './types';

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
            cb(err);
        });
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

export const register = (data, cb) => {
    return dispatch => {
        axios.post('http://localhost:3001/users/register', data)
            .then(res => {
                loginUser({ email: data.email, password: data.password }, dispatch, cb);
                cb();
            })
            .catch(err => {
                console.log(err);
                cb(err);
            });
    }
}

export const adminLogin = data => {
    return dispatch => {
        axios.post('http://localhost:3001/admins/login', data)
            .then(res => {
                let { token, admin } = res.data;
                localStorage.setItem('adminToken', token);
                localStorage.setItem('admin', JSON.stringify(admin));
                localStorage.removeItem('token');
                localStorage.removeItem('data');

                dispatch({
                    type: ADMIN_LOGIN,
                    payload: {
                        adminToken: token,
                        admin
                    }
                });
            })
            .catch(err => {
                console.log(err);
            })
    }
}

export const adminLogout = () => {
    return dispatch => {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('admin');
        dispatch({ type: ADMIN_LOGOUT });
    }
}