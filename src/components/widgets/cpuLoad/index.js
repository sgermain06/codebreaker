import { connect } from 'react-redux';
import Component from './component';

import fromState from '../../../state/selectors';
import Commands from '../../../state/commands';

const mapStateToProps = state => ({
    cpuLoad: fromState.Station.cpuLoad()(state),
    cpuCores: fromState.Station.cpuCores()(state),
});

const mapDispatchToProps = dispatch => ({
    addCpuLoad: (cpuLoad, index) => dispatch(Commands.Station.addCpuLoad(cpuLoad, index)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Component);