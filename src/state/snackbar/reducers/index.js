import {types as EventTypes} from '../events';
import genericReducer from '../../_common/reducers/generic-reducer';

const initialState = [];

const reductionLookup = {
    [EventTypes.EnqueueSnackbar]: (state, { key, notification }) => ([ ...state, { key, ...notification } ]),
    [EventTypes.CloseSnackbar]: (state, { key, dismissAll = false }) => ([ ...state, state.notifications.map(notification => (
        (dismissAll || notification.key === key) ? { ...notification, dismissed: true } : notification
    ))]),
    [EventTypes.RemoveSnackbar]: (state, key) => ([ ...state.filter(({ key: k }) => k !== key) ]),
    [EventTypes.ResetSnackbar]: () => initialState,
};

export default genericReducer(initialState, reductionLookup);
