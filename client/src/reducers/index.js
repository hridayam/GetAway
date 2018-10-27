import { combineReducers } from 'redux';
import auth from './auth';
import search from './search';
import chooseRoom from './chooseRoom';
import payment from './payment'

const rootReducer = combineReducers({
    auth,
    search,
    chooseRoom,
    payment
});

export default rootReducer;
