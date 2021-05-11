import ciphers from './ciphers/reducers';
import forums from './forums/reducers';
import player from './player/reducers';
import station from './station/reducers';

import { combineReducers } from 'redux';

export default combineReducers({
    ciphers,
    forums,
    player,
    station,
});