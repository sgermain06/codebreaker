import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Component from './component';

import fromState from '../../state/selectors';

const mapStateToProps = state => ({
    currency: fromState.Player.currency()(state),
    cpu: fromState.Station.cpu()(state),
    ram: fromState.Station.ram()(state),
});

const component = withRouter(Component);

export default connect(mapStateToProps)(component);