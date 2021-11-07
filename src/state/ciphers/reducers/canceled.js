import {types as EventTypes} from '../events';
import genericReducer from '../../_common/reducers/generic-reducer';

const initialState = [];

const reductionLookup = {
    [EventTypes.CancelCipher]: (state, cipher) => ([...state, cipher]),
};

export default genericReducer(initialState, reductionLookup);
