import common from '../../_common/selectors/_common';

export default common.bindToReducer('terminal', {
    lines: () => state => state,
});