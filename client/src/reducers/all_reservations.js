import { ALL_RESERVATIONS } from '../actions/types';

const INITIAL_STATE = [
];

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case ALL_RESERVATIONS:
            return action.payload;

        default: 
            return state;
    }
}