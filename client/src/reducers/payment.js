import {PAYMENT} from '../actions/types';

const INITIAL_STATE = {
    reservationid: null,
    price: 0
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case PAYMENT:
            return{
                ...state,
                reservationid: action.payload,
                price: action.payload
            }
        default:
            return state;
    }
}
