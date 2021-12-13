import {types as EventTypes} from '../events';
import genericReducer from '../../_common/reducers/generic-reducer';
import isNil from 'lodash/isNil';
import compact from 'lodash/compact';

const initialState = [];

const updateLine = (state, { index, prompt, value, error }) => compact([
    ...state.slice(0, index),
    { prompt, value, error },
    ...state.slice(index + 1),
]);

const appendLine = (state, { index, value }) => compact([
    ...state.slice(0, index),
    { ...state[index], value: state[index].value + value },
    ...state.slice(index + 1),
]);

const replaceRange = (state, { index, prompt, value, error, start, end }) => {
    const lineValue = state[index].value;
    if (isNil(start)) start = 0;
    if (isNil(end)) end = lineValue.length;

    return compact([
        ...state.slice(0, index),
        { prompt, value: lineValue.slice(0, start) + value + lineValue.slice(end), error },
        ...state.slice(index + 1),
    ]);
};

const reductionLookup = {
    [EventTypes.UpdateLine]: updateLine,
    [EventTypes.AppendLine]: appendLine,
    [EventTypes.AddLine]: (state, line) => [...state, line],
    [EventTypes.ReplaceRange]: replaceRange,
    [EventTypes.ClearTerminal]: () => initialState,
};

export default genericReducer(initialState, reductionLookup);
