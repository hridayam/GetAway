import { LOGIN_USER, REGISTER_USER } from '../actions/types';

const INITIAL_STATE = {
  user: {}
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case LOGIN_USER:
          return {
            ...state,
            user: action.payload
          };
          case REGISTER_USER:
          return {
            ...state,
            user: action.payload
          };
        
        

          default:
            return state;
    }
}
