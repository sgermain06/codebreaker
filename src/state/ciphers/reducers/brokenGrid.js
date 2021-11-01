import {types as EventTypes} from '../events';
import genericReducer from '../../_common/reducers/generic-reducer';

const initialState = [];

const reductionLookup = {
    [EventTypes.ResetBrokenGrid]: () => initialState,
    [EventTypes.AddBrokenGridCell]: (state, cell) => [ ...state, cell ],
};

export default genericReducer(initialState, reductionLookup);
