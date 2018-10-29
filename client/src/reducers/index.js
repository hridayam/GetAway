import { combineReducers } from 'redux';
import auth from './auth';
import reservation from './reservation';
import payment from './payment'

const rootReducer = combineReducers({
    auth,
    reservation,
    payment
});

export default rootReducer;
