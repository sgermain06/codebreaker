import {types as EventTypes} from '../events';
import genericReducer from '../../_common/reducers/generic-reducer';

const initialState = {
    type: 'Codium',
    speed: 1,
    cores: 1,
    usedCores: 0,
};

const reductionLookup = {
    [EventTypes.SetCpuType]: (state, type) => ({ ...state, type }),
    [EventTypes.SetCpuSpeed]: (state, speed) => ({ ...state, speed }),
    [EventTypes.SetCpuCores]: (state, cores) => ({ ...state, cores }),
    [EventTypes.UseCpuCores]: (state, usedCores) => ({ ...state, usedCores: state.usedCores + usedCores}),
};

export default genericReducer(initialState, reductionLookup);
