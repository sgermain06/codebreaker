import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Component from './component';

import Commands from '../../state/commands';
import fromState from '../../state/selectors';

import merge from 'lodash/merge';

const mapStateToProps = state => ({
    cpu: fromState.Station.cpu()(state),
});

const mapDispatchToProps = dispatch => ({
    increaseCpuSpeed: () => dispatch(Commands.Station.increaseCpuSpeed()),
    resetCpuSpeed: () => dispatch(Commands.Station.resetCpuSpeed()),
    increaseCpuCores: () => dispatch(Commands.Station.increaseCpuCores()),
    resetCpuCores: () => dispatch(Commands.Station.resetCpuCores()),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => {
    return merge(stateProps, dispatchProps, ownProps);
};

const component = withRouter(Component);

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(component);