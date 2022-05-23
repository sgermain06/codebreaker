import {buildEvents, singleParameter, namedParams, noParameters} from '../../_common/events/create';

const definition = {
    AddItem: namedParams('id', 'item', 'price'),
    RemoveItem: singleParameter,
    Clear: noParameters,
};

const {types, events} = buildEvents('shoppingCart', definition);

export {types};

export default events;