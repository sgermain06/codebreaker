import auth from './authentication/reducers';
import ciphers from './ciphers/reducers';
import forums from './forums/reducers';
import loader from './loader/reducers';
import player from './player/reducers';
import shoppingCart from './shoppingCart/reducers';
import snackbar from './snackbar/reducers';
import station from './station/reducers';
import terminal from './terminal/reducers';

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

const returnObj = history => combineReducers({
    auth,
    ciphers,
    forums,
    loader,
    player,
    shoppingCart,
    snackbar,
    station,
    terminal,
    router: connectRouter(history),
});

export default returnObj;