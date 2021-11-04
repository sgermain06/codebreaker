import { combineReducers } from 'redux';
import broken from './brokenGrid';
import characters from './characterGrid';
import classes from './gridClasses';

export default combineReducers({
    classes,
    broken,
    characters,
});
