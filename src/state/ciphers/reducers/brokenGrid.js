import {types as EventTypes} from '../events';
import genericReducer from '../../_common/reducers/generic-reducer';

const initialState = [];

const reductionLookup = {
    [EventTypes.AddBrokenGridCell]: (state, cell) => [ ...state, cell ],
    [EventTypes.ResetGrid]: () => initialState,
};

export default genericReducer(initialState, reductionLookup);
