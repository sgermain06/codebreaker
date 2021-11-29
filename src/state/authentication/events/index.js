import {buildEvents, singleParameter, noParameters} from '../../_common/events/create';

const definition = {
    RedirectTo: singleParameter,
    SetRememberUsername: singleParameter,
    SetToken: singleParameter,
    Logout: noParameters,
};

const {types, events} = buildEvents('auth', definition);

export {types};

export default events;