import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Component from './component';

import Commands from '../../state/commands';
import fromState from '../../state/selectors';

import merge from 'lodash/merge';

const mapStateToProps = state => ({
    cpu: fromState.Station.cpu()(state),
    broadbandType: fromState.Station.broadbandTypeDescription()(state),
    broadbandProvider: fromState.Station.broadbandProvider()(state),
    broadbandSpeed: fromState.Station.broadbandSpeed()(state),
});

const mapDispatchToProps = dispatch => ({
    increaseCpuSpeed: () => dispatch(Commands.Station.increaseCpuSpeed()),
    resetCpuSpeed: () => dispatch(Commands.Station.resetCpuSpeed()),
    increaseCpuCores: () => dispatch(Commands.Station.increaseCpuCores()),
    resetCpuCores: () => dispatch(Commands.Station.resetCpuCores()),
    increaseBroadbandSpeed: () => dispatch(Commands.Station.increaseBroadbandSpeed()),
    resetBroadbandSpeed: () => dispatch(Commands.Station.resetBroadbandSpeed()),
    increaseBroadbandType: () => dispatch(Commands.Station.increaseBroadbandType()),
    resetBroadbandType: () => dispatch(Commands.Station.resetBroadbandType()),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => {
    return merge(stateProps, dispatchProps, ownProps);
};

const component = withRouter(Component);

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(component);