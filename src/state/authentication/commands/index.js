import Events from '../events';
import axios from 'axios';

import { replace } from 'connected-react-router';

import Commands from '../../commands';
import fromState from '../../selectors';
import isEmpty from 'lodash/isEmpty';

const returnObj = {
    login: ({ username, password, rememberUsername }) => async (dispatch, getState) => {
        try {
            const response = await axios.post(`${$config.endpoint}/api/v1/security/login`, { username, password });
            dispatch(Events.SetToken(response.data.token));
            if (rememberUsername) {
                dispatch(Events.SetRememberUsername(username));
            }
            else {
                dispatch(Events.SetRememberUsername(''));
            }
            const redirectTo = fromState.Authentication.redirectTo()(getState());
            if (!isEmpty(redirectTo)) {
                dispatch(replace(redirectTo));
            }
        }
        catch (error) {
            dispatch(Commands.Snackbar.enqueueSnackbar(error.response.data.message, { variant: 'error' }));
            throw error;
        }
    },
    logout: () => async dispatch => {
        dispatch(Events.Logout());
    },
    refreshToken: () => (dispatch, getState) => {
        const token = getState().token;
        console.log('Token:', token);
        // dispatch(Events.RefreshToken())
    },
    setRedirectTo: redirectTo => dispatch => dispatch(Events.RedirectTo(redirectTo)),
    redirect: redirectTo => dispatch => {
        console.log('Redirecting! Should be replacing URL to', redirectTo);
        dispatch(replace(redirectTo))
    },
};

export default returnObj;