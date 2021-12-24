import {buildEvents, singleParameter} from '../../_common/events/create';

const definition = {
    Loading: singleParameter,
};

const {types, events} = buildEvents('loader', definition);

export {types};

export default events;