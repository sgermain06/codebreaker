import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Component from './component';

import Commands from '../../state/commands';
import fromState from '../../state/selectors';

const mapStateToProps = state => ({
    cpu: fromState.Station.cpu()(state),
    storageSize: fromState.Station.storageSize()(state),
    storageType: fromState.Station.storageTypeSpeed()(state),
    broadbandType: fromState.Station.broadbandTypeDescription()(state),
    broadbandProvider: fromState.Station.broadbandProvider()(state),
    broadbandSpeed: fromState.Station.broadbandSpeed()(state),
});

const mapDispatchToProps = dispatch => ({
    increaseCpuSpeed: () => dispatch(Commands.Station.increaseCpuSpeed()),
    resetCpuSpeed: () => dispatch(Commands.Station.resetCpuSpeed()),
    increaseCpuCores: () => dispatch(Commands.Station.increaseCpuCores()),
    resetCpuCores: () => dispatch(Commands.Station.resetCpuCores()),
    increaseStorageSize: () => dispatch(Commands.Station.increaseStorageSize()),
    resetStorageSize: () => dispatch(Commands.Station.resetStorageSize()),
    increaseStorageType: () => dispatch(Commands.Station.increaseStorageType()),
    resetStorageType: () => dispatch(Commands.Station.resetStorageType()),
    increaseBroadbandSpeed: () => dispatch(Commands.Station.increaseBroadbandSpeed()),
    resetBroadbandSpeed: () => dispatch(Commands.Station.resetBroadbandSpeed()),
    increaseBroadbandType: () => dispatch(Commands.Station.increaseBroadbandType()),
    resetBroadbandType: () => dispatch(Commands.Station.resetBroadbandType()),
});

const component = withRouter(Component);

export default connect(mapStateToProps, mapDispatchToProps)(component);