import {buildEvents, singleParameter, namedParams, noParameters} from '../../_common/events/create';

const definition = {
    AddCipher: singleParameter,
    UpdateCipher: namedParams('cipher', 'update'),
    CompleteCipher: singleParameter,
    CancelCipher: singleParameter,
    SetCharacterGrid: singleParameter,
    AddBrokenGridCell: singleParameter,
    ResetBrokenGrid: noParameters,
};

const {types, events} = buildEvents('ciphers', definition);

export {types};

export default events;