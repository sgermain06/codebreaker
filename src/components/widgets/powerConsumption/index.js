import { connect } from 'react-redux';
import Component from './component';

import fromState from '../../../state/selectors';

const mapStateToProps = state => ({
    cpuLoad: fromState.Station.allCpuLoadAvg()(state),
    cpuCores: fromState.Station.cpuCores()(state),
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Component);