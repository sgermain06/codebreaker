import ciphers from './ciphers/reducers';
import forums from './forums/reducers';
import player from './player/reducers';
import snackbar from './snackbar/reducers';
import station from './station/reducers';
import terminal from './terminal/reducers';

import { combineReducers } from 'redux';

export default combineReducers({
    ciphers,
    forums,
    player,
    snackbar,
    station,
    terminal,
});