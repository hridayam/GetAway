import {
            SEARCH_HOTELS, CHOOSE_ROOM, SELECT_HOTEL, SELECT_ROOMS,
            START_LOADING, END_LOADING,
            ALL_RESERVATIONS
        } from '../actions/types';

const INITIAL_STATE = {
    hotels: null,
    selectedRooms: null,
    selectedHotel: null,
    city: '',
    startDateMoment: {},
    endDateMoment: {},
    numGuests: 0,
    isLoading: false,
    reservations: []
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case SEARCH_HOTELS:
            let { hotels, city, numGuests, startDateMoment, endDateMoment } = action.payload;
            return{
                ...state,
                hotels,
                city,
                numGuests,
                startDateMoment,
                endDateMoment
            };

        case SELECT_HOTEL:
            return {
                ...state,
                selectedHotel: action.payload
            };

        case SELECT_ROOMS:
            return {
                ...state,
                ...action.payload
            }

        case CHOOSE_ROOM:
            return {
                ...state,
                room: action.payload
            };

        case START_LOADING:
            return {
                ...state,
                ...action.payload
            };

        case END_LOADING:
            return {
                ...state,
                ...action.payload
            };

        case ALL_RESERVATIONS:
            return {
                ...state,
                reservations: action.payload
            };

        default:
            return state;
    }
}
