import {buildEvents, namedParams, noParameters, singleParameter} from '../../_common/events/create';

const definition = {
    EnqueueSnackbar: namedParams('key', 'notification'),
    CloseSnackbar: namedParams('key', 'dismissAll'),
    RemoveSnackbar: singleParameter,
    ResetSnackbar: noParameters,
};

const {types, events} = buildEvents('snackbar', definition);

export {types};

export default events;