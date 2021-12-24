import axios from 'axios';

import Commands from '../../commands';
import fromState from '../../selectors';

import get from 'lodash/get';

const request = ({method, path, body, anonymous = false}) => async (dispatch, getState) => {
    try {
        dispatch(Commands.Loader.startLoading());
        const url = `${$config.endpoint}/api/v1${path}`;
        const headers = {
            'Content-Type': 'application/json',
        };
        if (!anonymous) {
            headers['Authorization'] = `Bearer ${fromState.Authentication.token()(getState())}`;
        }

        switch (method.toUpperCase()) {
            case 'POST':
            case 'PUT':
                return get(await axios[method.toLowerCase()](url, body, {headers}), 'data');
            default:
                return get(await axios[method.toLowerCase()](url, {headers}), 'data');
        }
    }
    catch (error) {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    dispatch(Commands.Authentication.setToken(null));
                    break;
                default:
                    // Nothing special.
                    break;
            }
        }
        throw error;
    }
    finally {
        dispatch(Commands.Loader.stopLoading());
    }
};

const returnObj = {
    get: (path, anonymous = false) => (dispatch, getState) => request({method: 'GET', path, anonymous})(dispatch, getState),
    post: (path, body, anonymous = false) => (dispatch, getState) => request({method: 'POST', path, body, anonymous})(dispatch, getState),
    put: (path, body, anonymous = false) => (dispatch, getState) => request({method: 'PUT', path, body, anonymous})(dispatch, getState),
    delete: (path, anonymous = false) => (dispatch, getState) => request({method: 'DELETE', path, anonymous})(dispatch, getState),
    request,
};

export default returnObj;