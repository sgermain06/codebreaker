import Events from '../events';

import { replace } from 'connected-react-router';

import Commands from '../../commands';
import fromState from '../../selectors';
import isEmpty from 'lodash/isEmpty';

const returnObj = {
    login: ({ username, password, rememberUsername }) => async (dispatch, getState) => {
        try {
            const response = await dispatch(Commands.API.post('/security/login', { username, password }, true));
            await dispatch(Events.SetToken(response.data.token));
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
    setToken: token => async dispatch => dispatch(Events.SetToken(token)),
    logout: () => async dispatch => {
        dispatch(Events.Logout());
    },
    refreshToken: () => dispatch => {
        dispatch(Events.RefreshToken())
    },
    setRedirectTo: redirectTo => dispatch => dispatch(Events.RedirectTo(redirectTo)),
    redirect: redirectTo => dispatch => dispatch(replace(redirectTo)),
};

export default returnObj;