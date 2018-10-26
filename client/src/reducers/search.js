import {SEARCH_HOTELS} from '../actions/types';

const INITIAL_STATE = {
    hotels: null
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case SEARCH_HOTELS:
            return{
                ...state,
                hotels: action.payload
            }
        default: 
            return state;
    }
}