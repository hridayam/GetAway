import { combineReducers } from 'redux';
import auth from './auth';
import reservation from './reservation';
import payment from './payment';
import allReservations from './all_reservations';

const rootReducer = combineReducers({
    auth,
    reservation,
    payment,
    allReservations
});

export default rootReducer;
