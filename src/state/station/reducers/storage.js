import {types as EventTypes} from '../events';
import genericReducer from '../../_common/reducers/generic-reducer';

const initialState = {
    size: 2048,
    type: 0,
};

const reductionLookup = {
    [EventTypes.SetStorageSize]: (state, size) => ({ ...state, size }),
    [EventTypes.SetStorageType]: (state, type) => ({ ...state, type }),
};

export default genericReducer(initialState, reductionLookup);
