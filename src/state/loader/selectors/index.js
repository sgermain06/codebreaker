import common from '../../_common/selectors/_common';

export default common.bindToReducer('loader', {
    isLoading: () => state => state,
});