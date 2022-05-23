import {types as EventTypes} from '../events';
import genericReducer from '../../_common/reducers/generic-reducer';

const initialState = [];

const addItem = (state, item) => [ ...state, item ];
const removeItem = (state, itemId) => {
    const index = state.indexOf(state.find(o => o.id === itemId));
    return [
        ...state.slice(0, index),
        ...state.slice(index + 1)
    ];
};

const reductionLookup = {
    [EventTypes.AddItem]: addItem,
    [EventTypes.RemoveItem]: removeItem,
    [EventTypes.Clear]: () => initialState,
};

export default genericReducer(initialState, reductionLookup);