import {types as EventTypes} from '../events';
import genericReducer from '../../_common/reducers/generic-reducer';

const initialState = {
    token: '',
    rememberUsername: '',
    redirectTo: '',
};

const reductionLookup = {
    [EventTypes.RedirectTo]: (state, redirectTo) => ({...state, redirectTo}),
    [EventTypes.SetRememberUsername]: (state, rememberUsername) => ({...state, rememberUsername}),
    [EventTypes.SetToken]: (state, token) => ({...state, token}),
    [EventTypes.Logout]: () => initialState,
};

export default genericReducer(initialState, reductionLookup);