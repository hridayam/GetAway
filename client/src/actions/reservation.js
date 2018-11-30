import axios from 'axios';
import moment from 'moment';

import { SEARCH_HOTELS, CHOOSE_ROOM, SELECT_HOTEL, 
    SELECT_ROOMS, ALL_RESERVATIONS, URL, START_LOADING, END_LOADING
} from './types';

export const search = (city, numGuests, startDateMoment, endDateMoment) => {
    return dispatch => {
        dispatch({
            type: START_LOADING,
            payload: {
                isLoading: true
            }
        });

        axios.post('http://localhost:3001/hotels/search', { city, numGuests })
            .then(res => {
                dispatch({
                    type: END_LOADING,
                    payload: {
                        isLoading: false
                    }
                });
                dispatch({ 
                    type: SEARCH_HOTELS , 
                    payload: {
                        city,
                        numGuests,
                        hotels: res.data.hotels,
                        startDateMoment,
                        endDateMoment
                }});
                dispatch({
                    type: END_LOADING,
                    payload: {
                        isLoading: false
                    }
                });
            })
            .catch(err => {
                console.log(err.response);
                });
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


export const getAllReservations = email => {
    return dispatch => {
        axios.post(`http://localhost:3001/reservations/all`, { email })

            .then(res => {
                dispatch({
                    type: ALL_RESERVATIONS, 
                    payload: res.data.reservations
                });
            })
            .catch(err => {
                console.log(err);
            });
    }
}