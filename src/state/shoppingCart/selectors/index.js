import common from '../../_common/selectors/_common';

import sum from 'lodash/sum';

export default common.bindToReducer('shoppingCart', {
    getCart: () => state => state,
    getCartPrice: () => state => sum(state.map(i => i.price)),
});