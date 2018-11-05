import axios from 'axios';

import { SEARCH_HOTELS, CHOOSE_ROOM, SELECT_HOTEL, 
    SELECT_ROOMS, ALL_RESERVATIONS, URL
} from './types';

export const search = (city, startDate, endDate, numGuests) => {
    return dispatch => {
        axios.post('http://localhost:3001/hotels/search', { city, startDate, endDate, numGuests })
        .then(res => {
            dispatch({ 
                type: SEARCH_HOTELS , 
                payload: {
                    city,
                    startDate,
                    endDate,
                    numGuests,
                    hotels: res.data.hotels 
            }})
        })
        .catch(err => {
            console.log(err.response);
            })
        }
}

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

export const selectRooms = (selectedHotel, selectedRooms) => {
    return {
        type: SELECT_ROOMS,
        payload: {
            selectedHotel,
            selectedRooms
        }
    };
}

export const selectHotel = hotel => {
    return {
        type: SELECT_HOTEL,
        payload: hotel
    };
}

export const getAllReservations = () => {
    return dispatch => {
        axios.get(`${URL}reservations/all`)
        .then(req => {
            console.log(req)
            //dispatch({type: ALL_RESERVATIONS, payload: req.reservations})
        })
    }
}