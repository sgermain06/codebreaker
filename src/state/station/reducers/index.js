import { combineReducers } from 'redux';
import broadband from './broadband';
import cpu from './cpu';
import display from './display';
import storage from './storage';
import graphics from './graphics';
import powersupply from './powersupply';
import ram from './ram';

export default combineReducers({
    broadband,
    cpu,
    display,
    graphics,
    powersupply,
    ram,
    storage,
});