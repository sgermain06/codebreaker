import { connect } from 'react-redux';

import fromState from '../../state/selectors';
import Commands from '../../state/commands';

import Component from './component';

const mapStateToProps = state => ({
    terminalLines: fromState.Terminal.lines()(state),
});

const mapDispatchToProps = dispatch => ({
    updateLine: (line, index) => dispatch(Commands.Terminal.updateLine(line, index)),
    appendLine: (line, index) => dispatch(Commands.Terminal.appendLine(line, index)),
    replaceCharsForRange: ({prompt, value, error, start, end}, index) =>
        dispatch(Commands.Terminal.replaceRange({prompt, value, error, start, end}, index)),
    addLine: line => dispatch(Commands.Terminal.addLine(line)),
    clearTerminal: () => dispatch(Commands.Terminal.clearTerminal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Component);