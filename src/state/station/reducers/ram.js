import {types as EventTypes} from '../events';
import genericReducer from '../../_common/reducers/generic-reducer';

const initialState = {
    size: 2048,
    type: 1,
};

const reductionLookup = {
    [EventTypes.SetRamSize]: (state, size) => ({ ...state, size }),
    [EventTypes.SetRamType]: (state, type) => ({ ...state, type }),
};

export default genericReducer(initialState, reductionLookup);
