import Events from '../events';

import fromState from '../../selectors';

const returnObj = {
    receiveCurrency: amount => dispatch => {
        dispatch(Events.AddNotification(`Received $${amount} for breaking cipher.`, undefined, 'success'));
        dispatch(Events.ReceiveCurrency(amount))
    },
    spendCurrency: amount => (dispatch, getState) => {
        if (fromState.Player.canAfford(amount)(getState())) {
            dispatch(Events.SpendCurrency(amount))
        }
        else {
            console.log('Cannot afford:', amount);
            throw new Error(`Cannot afford: ${amount}`);
        }
    },
    addNotification: ({ message, obj, level = 'info' }) => dispatch => dispatch(Events.AddNotification(message, obj, level)),
    resetNotifications: () => dispatch => dispatch(Events.ResetNotifications()),
};

export default returnObj;