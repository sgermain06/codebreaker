import Events from '../events';

const returnObj = {
    receiveCurrency: amount => dispatch => dispatch(Events.ReceiveCurrency(amount)),
    spendCurrency: amount => dispatch => dispatch(Events.SpendCurrency(amount)),
};

export default returnObj;