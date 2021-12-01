import Authentication from './authentication/commands';
import Ciphers from './ciphers/commands';
import Forums from './forums/commands';
import Player from './player/commands';
import Snackbar from './snackbar/commands';
import Station from './station/commands';
import Terminal from './terminal/commands';
import API from './api/commands';

const returnObj = {
    API,
    Authentication,
    Ciphers,
    Forums,
    Player,
    Snackbar,
    Station,
    Terminal,
};

export default returnObj;