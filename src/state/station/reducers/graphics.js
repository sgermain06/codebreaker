import {types as EventTypes} from '../events';
import genericReducer from '../../_common/reducers/generic-reducer';

const initialState = {
    clock: 10,
    memory: 1,
};

const reductionLookup = {
    [EventTypes.SetGraphicsClock]: (state, clock) => ({ ...state, clock }),
    [EventTypes.SetGraphicsMemory]: (state, memory) => ({ ...state, memory }),
};

export default genericReducer(initialState, reductionLookup);
