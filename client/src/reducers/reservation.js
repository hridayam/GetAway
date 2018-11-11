import { SEARCH_HOTELS, CHOOSE_ROOM, SELECT_HOTEL, SELECT_ROOMS } from '../actions/types';

const INITIAL_STATE = {
    hotels: null,
    selectedRooms: null,
    selectedHotel: null,
    city: '',
    startDate: 0,
    endDate: 0,
    startDateStr: '',
    endDateStr: '',
    numGuests: 0
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case SEARCH_HOTELS:
            let { hotels, city, startDate, endDate, numGuests, startDateStr, endDateStr } = action.payload;
            return{
                ...state,
                hotels,
                city,
                startDate,
                endDate,
                numGuests,
                startDateStr,
                endDateStr
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
            return{
                ...state,
                room: action.payload
            };

        default: 
            return state;
    }
}