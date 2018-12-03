import { LOGIN_USER, LOGOUT_USER, ADMIN_LOGIN, ADMIN_LOGOUT } from '../actions/types';

const INITIAL_STATE = {
  admin: null
}

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOGIN_USER:
      return action.payload;

    case LOGOUT_USER:
      return INITIAL_STATE
    
    case ADMIN_LOGIN:
      return action.payload;
    
    case ADMIN_LOGOUT:
      return INITIAL_STATE;

    default:
      return state;
  } 
}
