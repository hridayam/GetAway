import axios from 'axios';

import { SEARCH_HOTELS } from './types';

export const search = (city, startDate, endDate, numGuests) => {
    return dispatch => {
        axios.post('http://localhost:3001/hotels/search', { city, startDate, endDate, numGuests })
        .then(res => {
            dispatch({ type: SEARCH_HOTELS , payload: res.data.hotels })
        })
        .catch(err => {
            console.log(err.response);
            })
        }
    }