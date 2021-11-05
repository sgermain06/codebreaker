import common from '../../_common/selectors/_common';

export default common.bindToReducer('snackbar', {
    getNotifications: () => state => state,
});