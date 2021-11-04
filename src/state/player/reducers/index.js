import { combineReducers } from 'redux';
import currency from './currency';
import notifications from './notifications';

export default combineReducers({
    currency,
    notifications,
});