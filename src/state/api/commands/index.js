import axios from 'axios';

import Commands from '../../commands';
import fromState from '../../selectors';

const request = ({method, path, body, anonymous = false}) => async (dispatch, getState) => {
    try {
        const url = `${$config.endpoint}/api/v1${path}`;
        const headers = {
            'Content-Type': 'application/json',
        };
        if (!anonymous) {
            headers['Authorization'] = `Bearer ${fromState.Authentication.token()(getState())}`;
        }

        let response;
        switch (method.toUpperCase()) {
            case 'POST':
            case 'PUT':
                response = await axios[method.toLowerCase()](url, body, {headers});
                break;
            default:
                response = await axios[method.toLowerCase()](url, {headers});
                break;
        }
        return response;
    }
    catch (error) {
        switch (error.response.status) {
            case 401:
                dispatch(Commands.Authentication.setToken(null));
                break;
            default:
                // Nothing special.
                break;
        }
        throw error;
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