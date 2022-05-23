import Events from '../events';
import isEmpty from 'lodash/isEmpty';

import { v4 as uuid } from 'uuid';

import fromState from '../../selectors';
import Commands from '../../commands';

const returnObj = {
    addItem: (item, price) => dispatch => dispatch(Events.AddItem(uuid(), item, price)),
    removeItem: item => dispatch => dispatch(Events.RemoveItem(item.id)),
    checkout: () => (dispatch, getState) => {
        if (!isEmpty(fromState.ShoppingCart.getCart()(getState()))) {
            const cartPrice = fromState.ShoppingCart.getCartPrice()(getState());
            if (fromState.Player.canAfford(cartPrice)(getState())) {
                dispatch(Commands.ShoppingCart.clear());
                return dispatch(Commands.Player.addNotification({
                    message: 'Success! Enjoy your purchase.',
                    level: 'success'
                }));
            }
            else {
                return dispatch(Commands.Player.addNotification({
                    message: `Cannot afford ${cartPrice.toLocaleString('en-us', { style: 'currency', currency: 'USD' })}`,
                    level: 'error'
                }));
            }
        }
        else {
            return dispatch(Commands.Player.addNotification({
                message: 'Your cart is empty.',
                level: 'warning'
            }));
        }
    },
    clear: () => dispatch => dispatch(Events.Clear()),
};

export default returnObj;