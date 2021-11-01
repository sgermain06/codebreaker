import common from '../../_common/selectors/_common';

export default common.bindToReducer('ciphers', {
    getActive: common.get('active'),
    getCompleted: common.get('completed'),
    getCanceled: common.get('canceled'),
    getBrokenGrid: common.get('brokenGrid'),
    getCharacterGrid: common.get('characterGrid'),
});