import { connect } from 'react-redux';
import Component from './component';

import fromState from '../../../state/selectors';
import Commands from '../../../state/commands';

const mapStateToProps = state => ({
    cpuLoad: fromState.Station.cpuLoad()(state),
});

const mapDispatchToProps = dispatch => ({
    addCpuLoad: cpuLoad => dispatch(Commands.Station.addCpuLoad(cpuLoad)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Component);