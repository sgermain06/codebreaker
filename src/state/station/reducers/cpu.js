import {types as EventTypes} from '../events';
import genericReducer from '../../_common/reducers/generic-reducer';
import { slice } from 'lodash';

const initialState = {
    type: 'Codium',
    speed: 1,
    cores: 1,
    usedCores: 0,
    load: Array(200).fill(0).map((_, k) => ({x: k, y: Math.floor(Math.random() * 50) + 50})),
};

const addCpuLoad = (state, load) => ({ ...state, load: [ ...slice(state.load, 1), load ]});

const reductionLookup = {
    [EventTypes.SetCpuType]: (state, type) => ({ ...state, type }),
    [EventTypes.SetCpuSpeed]: (state, speed) => ({ ...state, speed }),
    [EventTypes.SetCpuCores]: (state, cores) => ({ ...state, cores }),
    [EventTypes.UseCpuCores]: (state, usedCores) => ({ ...state, usedCores: state.usedCores + usedCores}),
    [EventTypes.AddCpuLoad]: addCpuLoad,
};

export default genericReducer(initialState, reductionLookup);
