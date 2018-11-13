import {PAYMENT} from '../actions/types';

const INITIAL_STATE = {
    reservationid: null,
    price: 0
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case PAYMENT:
            let { reservationid, price } = action.payload;
            return{
                ...state,
                reservationid,
                price
            }
        default:
            return state;
    }
}
