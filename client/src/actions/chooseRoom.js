import axios from 'axios';

import { CHOOSE_ROOM } from './types';

export const chooseRoom = (id, roomType, price) => {
    return dispatch => {
        axios.post('http://localhost:3001/hotels/all', { id, roomType, price})
        .then(res => {
            dispatch({ type: CHOOSE_ROOM , payload: res.data.hotels })
        })
        .catch(err => {
            console.log(err.response);
            })
        }
}
