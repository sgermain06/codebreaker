import {types as EventTypes} from '../events';
import genericReducer from '../../_common/reducers/generic-reducer';

const initialState = {
    wattage: 500,
    type: 'ATX',
};

const reductionLookup = {
    [EventTypes.SetPowerSupplyWattage]: (state, wattage) => ({ ...state, wattage }),
    [EventTypes.SetPowerSupplyType]: (state, type) => ({ ...state, type }),
};

export default genericReducer(initialState, reductionLookup);
