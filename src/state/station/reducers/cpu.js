import {types as EventTypes} from '../events';
import genericReducer from '../../_common/reducers/generic-reducer';
import { isNil, slice } from 'lodash';

const cores = 1;

const initialState = {
    type: 'Codium',
    speed: 1,
    cores,
    usedCores: 0,
    load: Array(cores).fill(0).map(() => ({
        y: Array(50).fill(0).map(() => Math.floor(Math.random() * 50) + 50)
    }))
};

const addCpuLoad = (state, [load, index]) => {
    
    if (isNil(state.load[index])) {
        state.load[index] = {
            y: Array(50).fill(0)
        };
    }
    
    const newLoadForIndex = (i, l) => ({
        y: [ ...slice(state.load[i].y, 1), l ]
    });

    return {
        ...state,
        load: Array(state.cores).fill(0).map((_, i) => (i === index) ? newLoadForIndex(i, load) : state.load[i]),
    };
};

const reductionLookup = {
    [EventTypes.SetCpuType]: (state, type) => ({ ...state, type }),
    [EventTypes.SetCpuSpeed]: (state, speed) => ({ ...state, speed }),
    [EventTypes.SetCpuCores]: (state, cores) => ({ ...state, cores }),
    [EventTypes.UseCpuCores]: (state, usedCores) => ({ ...state, usedCores: state.usedCores + usedCores}),
    [EventTypes.AddCpuLoad]: addCpuLoad,
};

export default genericReducer(initialState, reductionLookup);
