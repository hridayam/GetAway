import axios from 'axios';

import { SEARCH_HOTELS } from './types';

export const search = (data) => {
    return dispatch => {
        axios.post('http://localhost:3001/hotels/all_hotels', data)
        .then(res => {
            
        })
        .catch(err => {
            console.log(err.response);
        })
    }
}