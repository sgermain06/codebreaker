import common from '../../_common/selectors/_common';

export default common.bindToReducer('player', {
    currency: common.get('currency'),
});