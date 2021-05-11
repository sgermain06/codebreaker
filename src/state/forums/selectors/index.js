import common from '../../_common/selectors/_common';
import { DateTime } from 'luxon';
import { isEmpty } from 'lodash';

export default common.bindToReducer('forums', {
    posts: common.get('posts'),
    activePosts: () => (state) => state.posts.filter(i => DateTime.fromISO(i.expires).diff(DateTime.now()).toObject().milliseconds > 0 || isEmpty(i.expires)),
});