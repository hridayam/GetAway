import {CHOOSE_ROOM} from '../actions/types';

const INITIAL_STATE = {
    room: null

};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case CHOOSE_ROOM:
            return{
                ...state,
                room: action.payload
            }
        default:
            return state;
    }
}
