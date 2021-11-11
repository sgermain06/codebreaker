import {types as EventTypes} from '../events';
import genericReducer from '../../_common/reducers/generic-reducer';

const initialState = {
    size: 204800,
    type: 0,
    used: 0,
    dataSuffixOffset: 2,
};

const reductionLookup = {
    [EventTypes.SetStorageSize]: (state, size) => ({ ...state, size }),
    [EventTypes.SetStorageType]: (state, type) => ({ ...state, type }),
    [EventTypes.SetStorageUsed]: (state, used) => ({ ...state, used }),
};

export default genericReducer(initialState, reductionLookup);
