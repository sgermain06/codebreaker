import {types as EventTypes} from '../events';
import genericReducer from '../../_common/reducers/generic-reducer';

const initialState = {
    type: 'Codium',
    speed: 1
};

const reductionLookup = {
    [EventTypes.SetCpuType]: (state, type) => ({ ...state, type }),
    [EventTypes.SetCpuSpeed]: (state, speed) => ({ ...state, speed }),
};

export default genericReducer(initialState, reductionLookup);
