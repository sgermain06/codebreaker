import common from '../../_common/selectors/_common';

export default common.bindToReducer('terminal', {
    lines: () => state => state,
    lastLineIndex: () => state => state.length - 1,
});