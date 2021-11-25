import {types as EventTypes} from '../events';
import genericReducer from '../../_common/reducers/generic-reducer';

const initialState = [];

const updateLine = (state, { index, prompt, value, error }) => [
    ...state.slice(0, index),
    { prompt, value, error },
    ...state.slice(index + 1),
];

const appendLine = (state, { index, value }) => [
    ...state.slice(0, index),
    { ...state[index], value: state[index].value + value },
    ...state.slice(index + 1),
];

const reductionLookup = {
    [EventTypes.UpdateLine]: updateLine,
    [EventTypes.AppendLine]: appendLine,
    [EventTypes.AddLine]: (state, line) => [...state, line],
    [EventTypes.ClearTerminal]: () => initialState,
};

export default genericReducer(initialState, reductionLookup);
