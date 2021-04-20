import {buildEvents, singleParameter} from '../../_common/events/create';

const definition = {
    ReceiveCurrency: singleParameter,
    SpendCurrency: singleParameter,
};

const {types, events} = buildEvents('player', definition);

export {types};

export default events;