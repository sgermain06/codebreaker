import {types as EventTypes} from '../events';
import genericReducer from '../../_common/reducers/generic-reducer';

const initialState = [];

const reductionLookup = {
    [EventTypes.SetCharacterGrid]: (_, grid) => grid,
    [EventTypes.ResetGrid]: () => initialState,
};

export default genericReducer(initialState, reductionLookup);
