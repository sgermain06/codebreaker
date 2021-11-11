import {types as EventTypes} from '../events';
import genericReducer from '../../_common/reducers/generic-reducer';

const initialState = {
    type: 0,
    speed: 0,
};

const reductionLookup = {
    [EventTypes.SetBroadbandType]: (state, type) => ({ ...state, type }),
    [EventTypes.SetBroadbandSpeed]: (state, speed) => ({ ...state, speed }),
};

export default genericReducer(initialState, reductionLookup);
