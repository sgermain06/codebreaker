import { connect } from 'react-redux';

import fromState from '../../state/selectors';
import Commands from '../../state/commands';

import Component from './component';

const mapStateToProps = state => ({
    terminalLines: fromState.Terminal.lines()(state),
});

const mapDispatchToProps = dispatch => ({
    updateLine: (index, line) => dispatch(Commands.Terminal.updateLine(index, line)),
    updateCurrentLine: line => dispatch(Commands.Terminal.updateCurrentLine(line)),
    appendCurrentLine: line => dispatch(Commands.Terminal.appendCurrentLine(line)),
    appendLine: (index, line) => dispatch(Commands.Terminal.appendLine(index, line)),
    addLine: line => dispatch(Commands.Terminal.addLine(line)),
    clearTerminal: () => dispatch(Commands.Terminal.clearTerminal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Component);