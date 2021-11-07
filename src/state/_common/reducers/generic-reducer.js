import isNil from 'lodash/isNil';

const exportFunc = (initialState, reductionLookup) => (function(state, {type, payload, getState}) {
    if (isNil(state)) state = initialState;

    const reducer = reductionLookup[type];

    if (isNil(reducer)) return state;

    return reducer(state, payload, getState);
});

export default exportFunc;