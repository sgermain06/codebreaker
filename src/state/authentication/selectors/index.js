import common from '../../_common/selectors/_common';

export default common.bindToReducer('auth', {
    token: common.get('token'),
    rememberUsername: common.get('rememberUsername'),
    redirectTo: common.get('redirectTo'),
});