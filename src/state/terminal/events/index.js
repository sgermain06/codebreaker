import {buildEvents, namedParams, noParameters} from '../../_common/events/create';

const definition = {
    UpdateLine: namedParams('index', 'prompt', 'value', 'error'),
    AddLine: namedParams('prompt', 'value', 'error'),
    AppendLine: namedParams('index', 'value'),
    ReplaceRange: namedParams('index', 'prompt', 'value', 'error', 'start', 'end'),
    ClearTerminal: noParameters,
};

const {types, events} = buildEvents('terminal', definition);

export {types};

export default events;