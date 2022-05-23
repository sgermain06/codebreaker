import { connect } from 'react-redux';
import { withRouter } from "react-router";

import Component from './component';

import fromState from '../../state/selectors';
import Commands from '../../state/commands';

const mapStateToProps = state => ({
    cart: fromState.ShoppingCart.getCart()(state),
});

const mapDispatchToProps = dispatch => ({
    addItem: item => dispatch(Commands.ShoppingCart.addItem(item, item.price)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Component));
