import common from '../../_common/selectors/_common';

export default common.bindToReducer('ciphers', {
    getActive: common.get('active'),
    getCurrentCipher: common.lookup('active.0'),
    getCompleted: common.get('completed'),
    getCanceled: common.get('canceled'),
    getBrokenGrid: common.lookup('grid.broken'),
    getCharacterGrid: common.lookup('grid.characters'),
    getGridClasses: common.lookup('grid.classes'),
});