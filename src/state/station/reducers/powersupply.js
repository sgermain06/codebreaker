import {types as EventTypes} from '../events';
import genericReducer from '../../_common/reducers/generic-reducer';

const initialState = {
    wattage: 500,
    type: 'ATX',
    consumption: Array(50).fill(0),
};

const reductionLookup = {
    [EventTypes.SetPowerSupplyWattage]: (state, wattage) => ({ ...state, wattage }),
    [EventTypes.SetPowerSupplyType]: (state, type) => ({ ...state, type }),
    [EventTypes.AddPowerConsumption]: (state, consumption) => ({ ...state, consumption: [...state.consumption.slice(1), consumption] }),
};

export default genericReducer(initialState, reductionLookup);
