import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Component from './component';

import Commands from '../../state/commands';
import fromState from '../../state/selectors';

const mapStateToProps = state => ({
    cart: fromState.ShoppingCart.getCart()(state),
    cartPrice: fromState.ShoppingCart.getCartPrice()(state)
});

const mapDispatchToProps = dispatch => ({
    addItem: item => dispatch(Commands.ShoppingCart.addItem(item)),
    removeItem: item => dispatch(Commands.ShoppingCart.removeItem(item)),
    checkout: () => dispatch(Commands.ShoppingCart.checkout()),
    clear: () => dispatch(Commands.ShoppingCart.clear())
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Component));