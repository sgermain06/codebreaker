import {types as EventTypes} from '../events';
import genericReducer from '../../_common/reducers/generic-reducer';

const initialState = 1000;

const reductionLookup = {
    [EventTypes.ReceiveCurrency]: (state, amount) => state + amount,
    [EventTypes.SpendCurrency]: (state, amount) => state - amount,
};

export default genericReducer(initialState, reductionLookup);
