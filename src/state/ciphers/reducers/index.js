import { combineReducers } from 'redux';
import active from './active';
import completed from './completed';
import canceled from'./canceled';
import grid from './grid';

export default combineReducers({
    active,
    canceled,
    completed,
    grid,
});