import {types as EventTypes} from '../events';
import genericReducer from '../../_common/reducers/generic-reducer';

const initialState = {
    type: 0,
    speed: 0,
    activity: Array(50).fill(0),
};

const reductionLookup = {
    [EventTypes.SetBroadbandType]: (state, type) => ({ ...state, type }),
    [EventTypes.SetBroadbandSpeed]: (state, speed) => ({ ...state, speed }),
    [EventTypes.AddNetworkActivity]: (state, packetSize) => {
        console.log('Adding network activity:', packetSize);
        return ({ ...state, activity: [...state.activity.slice(1), packetSize] })
    },
};

export default genericReducer(initialState, reductionLookup);
