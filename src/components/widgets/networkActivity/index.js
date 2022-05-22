import { connect } from 'react-redux';
import Component from './component';

import fromState from '../../../state/selectors';

const mapStateToProps = state => ({
    broadbandSpeed: fromState.Station.broadbandSpeed()(state),
    networkActivity: fromState.Station.networkActivity()(state),
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Component);