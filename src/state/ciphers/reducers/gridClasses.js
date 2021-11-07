import {types as EventTypes} from '../events';
import genericReducer from '../../_common/reducers/generic-reducer';

const initialState = [];

const reductionLookup = {
    [EventTypes.SetGridClasses]: (_, grid) => grid,
    [EventTypes.ResetGrid]: () => initialState,
};

export default genericReducer(initialState, reductionLookup);
