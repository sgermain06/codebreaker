import Authentication from './authentication/selectors';
import Ciphers from './ciphers/selectors';
import Forums from './forums/selectors';
import Player from './player/selectors';
import Snackbar from './snackbar/selectors';
import Station from './station/selectors';
import Terminal from './terminal/selectors';

const returnObj = {
    Authentication,
    Ciphers,
    Forums,
    Player,
    Snackbar,
    Station,
    Terminal,
};

export default returnObj;