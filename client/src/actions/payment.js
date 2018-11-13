import axios from 'axios';

import { PAYMENT } from './types';

export const payment = (reservationid, price) => {
    return dispatch => {
        axios.post('http://localhost:3001/payment/pay', { reservationid, price})
        .then(res => {
            dispatch({ type: PAYMENT , payload: res.data.payment })
        })
        .catch(err => {
            console.log(err.response);
            })
        }
}
