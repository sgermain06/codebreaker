import Events from '../events';

import fromState from '../../../state/selectors';

const returnObj = {
    updateCurrentLine: ({prompt, value, error}) => (dispatch, getState) => {
        const terminalLines = fromState.Terminal.lines()(getState());
        const index = terminalLines.length - 1;
        return dispatch(Events.UpdateLine(index, prompt, value, error));
    },
    appendCurrentLine: value => (dispatch, getState) => {
        const terminalLines = fromState.Terminal.lines()(getState());
        const index = terminalLines.length - 1;
        return dispatch(Events.AppendLine(index, value));
    },
    updateLine: (index, {prompt, value, error}) => dispatch => dispatch(Events.UpdateLine(index, prompt, value, error)),
    appendLine: (index, value) => dispatch => dispatch(Events.AppendLine(index, value)),
    addLine: ({prompt, value, error}) => dispatch => dispatch(Events.AddLine(prompt, value, error)),
    clearTerminal: () => dispatch => dispatch(Events.ClearTerminal()),
};

export default returnObj;