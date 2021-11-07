import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Component from './component';

import Commands from '../../state/commands';
import fromState from '../../state/selectors';

const mapStateToProps = state => ({
    currency: fromState.Player.currency()(state),
    notifications: fromState.Player.notifications()(state),
});

const mapDispatchToProps = dispatch => ({
    receiveCurrency: amount => dispatch(Commands.Player.receiveCurrency(amount)),
    spendCurrency: amount => dispatch(Commands.Player.spendCurrency(amount)),
});

const component = withRouter(Component);

export default connect(mapStateToProps, mapDispatchToProps)(component);