import Events from '../events';

import fromState from '../../selectors';

const returnObj = {
    receiveCurrency: amount => dispatch => dispatch(Events.ReceiveCurrency(amount)),
    spendCurrency: amount => (dispatch, getState) => {
        if (fromState.Player.canAfford(amount)(getState())) {
            dispatch(Events.SpendCurrency(amount))
        }
        else {
            console.log('Cannot afford:', amount);
        }
    },
};

export default returnObj;