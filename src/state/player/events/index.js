import {buildEvents, namedParams, noParameters, singleParameter} from '../../_common/events/create';

const definition = {
    ReceiveCurrency: singleParameter,
    SpendCurrency: singleParameter,
    AddNotification: namedParams('message', 'obj', 'level'),
    ResetNotifications: noParameters,
};

const {types, events} = buildEvents('player', definition);

export {types};

export default events;