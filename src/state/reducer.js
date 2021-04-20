import player from './player/reducers';
import station from './station/reducers';

import { combineReducers } from 'redux';

export default combineReducers({
    player,
    station,
});