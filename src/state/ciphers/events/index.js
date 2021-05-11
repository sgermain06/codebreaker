import {buildEvents, singleParameter, namedParams} from '../../_common/events/create';

const definition = {
    AddCipher: singleParameter,
    UpdateCipher: namedParams('cipher', 'update'),
    CompleteCipher: singleParameter,
    CancelCipher: singleParameter,
};

const {types, events} = buildEvents('ciphers', definition);

export {types};

export default events;