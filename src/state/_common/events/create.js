import noop from 'lodash/noop';
import identity from 'lodash/identity';
import zipObject from 'lodash/zipObject';
import keys from 'lodash/keys';
import kebabCase from 'lodash/kebabCase';

export const singleParameter = identity;

export const multipleParameters = (...params) => params;

export const noParameters = noop;

const createAction =  (type, getPayload = noParameters) => (...params) => ({
    type,
    payload: getPayload(...params),
});

export default createAction;

export const namedParams = (...names) => (...params) => zipObject(names, params);

export function buildEvents(prefix = '', definition) {
    const types = {};
    const events = {};
    keys(definition).forEach(key => {
        const type = `${kebabCase(prefix)}-${kebabCase(key)}`;
        types[key] = type;
        events[key] = createAction(type, definition[key]);
    });

    return {types, events};
}
