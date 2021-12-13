import Events from '../events';

import fromState from '../../../state/selectors';

const returnObj = {
    updateLine: ({prompt, value, error}, index = -1) => (dispatch, getState) => {
        index = index > -1 ? index : fromState.Terminal.lastLineIndex()(getState());
        return dispatch(Events.UpdateLine(index, prompt, value, error))
    },
    appendLine: (value, index = -1) => (dispatch, getState) => {
        index = index > -1 ? index : fromState.Terminal.lastLineIndex()(getState());
        return dispatch(Events.AppendLine(index, value));
    },
    replaceRange: ({prompt, value, error, start, end}, index = -1) => (dispatch, getState) => {
        index = index > -1 ? index : fromState.Terminal.lastLineIndex()(getState());
        if (start < 0) {
            const line = fromState.Terminal.lines()(getState())[index].value;
            start = line.length + start;
        }
        return dispatch(Events.ReplaceRange(index, prompt, value, error, start, end))
    },
    addLine: ({prompt, value, error}) => dispatch => dispatch(Events.AddLine(prompt, value, error)),
    clearTerminal: () => dispatch => dispatch(Events.ClearTerminal()),
};

export default returnObj;