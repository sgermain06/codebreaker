import {buildEvents, namedParams, singleParameter } from '../../_common/events/create';

const definition = {
    CreatePost: namedParams('title', 'author', 'message', 'cipher'),
    DeletePost: singleParameter,
    MarkPostRead: singleParameter,
};

const {types, events} = buildEvents('forums', definition);

export {types};

export default events;