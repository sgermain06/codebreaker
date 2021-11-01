import { combineReducers } from 'redux';
import active from './active';
import completed from './completed';
import canceled from'./canceled';
import characterGrid from './characterGrid';
import brokenGrid from './brokenGrid';

export default combineReducers({
    active,
    canceled,
    completed,
    characterGrid,
    brokenGrid,
});