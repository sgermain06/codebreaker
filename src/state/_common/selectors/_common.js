import getFp from 'lodash/fp/get';
import reduce from 'lodash/reduce';
import constant from 'lodash/constant';
import flow from 'lodash/flow';
import includes from 'lodash/includes';
import isString from 'lodash/isString';
import partial from 'lodash/partial';
import fromPairs from 'lodash/fromPairs';
import toPairs from 'lodash/toPairs';
import mapValues from 'lodash/fp/mapValues';

const basicFieldValue = ({field, state}) => state.fieldValue[field];
const getUsername = getFp('username');
const stringOrUsername = value => isString(value) ? value : getUsername(value);
const fieldValue = ({getters = []}) => field => state => {
    const getValueParam = {field, state};
    function recurse(getValue, ...others) {
        if (getValue === undefined) return basicFieldValue(getValueParam);
        return getValue(getValueParam) || recurse(...others);
    }
    return recurse(...getters);
};
fieldValue.standardUserFields = ['creator', 'modifier'];
fieldValue.userFieldValue = ({userFields = fieldValue.standardUserFields} = {}) => (getValueParam) => {
    return includes(userFields, getValueParam.field)
        ? stringOrUsername(basicFieldValue(getValueParam))
        : undefined;
};

const op = (op, p1, p2) => (...containerParams) => state => op(p1(...containerParams)(state), p2(...containerParams)(state));

const nestedSelectorOp = key => selector => (...params) => flow(
    getFp(key),
    selector(...params)
);

function splitNestedSelector([key, nestedSelectorObject]) {
    return flow(
        mapValues(nestedSelectorOp(key)),
        toPairs
    )(nestedSelectorObject);
}

const bindToReducer = (reducer, selectors) => flow(
    splitNestedSelector,
    fromPairs
)([reducer, selectors]);

// CommonParameters -> ContainerParameters -> State -> Result
const exportFunc = {
    or: partial(op, (a, b) => a || b),
    and: partial(op, (a, b) => a && b),
    not: op => (...props) => state => !(op(...props)(state)),
    get: flow(getFp, constant),
    op,
    lookup: property => (...keys) => state => reduce(keys, (lookup, key) => getFp(key)(lookup), getFp(property)(state)),
    constant: value => constant(constant(value)),
    bindToReducer,
};

export default exportFunc;