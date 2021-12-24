import {types as EventTypes} from '../events';
import genericReducer from '../../_common/reducers/generic-reducer';

const initialState = false;

const reductionLookup = {
    [EventTypes.Loading]: (_, loading) => loading,
};

export default genericReducer(initialState, reductionLookup);