import {types as EventTypes} from '../events';
import genericReducer from '../../_common/reducers/generic-reducer';

const initialState = [];

const reductionLookup = {
    [EventTypes.AddNotification]: (state, { message, obj, level }) => [ ...(state.length < 10 ? state : state.slice(1)), { message, obj, level } ],
    [EventTypes.ResetNotifications]: () => initialState,
};

export default genericReducer(initialState, reductionLookup);
