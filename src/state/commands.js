import Authentication from './authentication/commands';
import Ciphers from './ciphers/commands';
import Forums from './forums/commands';
import Loader from './loader/commands';
import Player from './player/commands';
import ShoppingCart from './shoppingCart/commands';
import Snackbar from './snackbar/commands';
import Station from './station/commands';
import Terminal from './terminal/commands';
import API from './api/commands';

const returnObj = {
    API,
    Authentication,
    Ciphers,
    Forums,
    Loader,
    Player,
    ShoppingCart,
    Snackbar,
    Station,
    Terminal,
};

export default returnObj;