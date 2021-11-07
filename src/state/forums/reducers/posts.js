import {types as EventTypes} from '../events';
import genericReducer from '../../_common/reducers/generic-reducer';
import { v4 } from 'uuid';
import { slice } from 'lodash';
import { DateTime } from 'luxon';

const initialState = [];

const reductionLookup = {
    [EventTypes.CreatePost]: (state, { title, author, message, cipher }) => {
        const now = DateTime.now();
        return [
            ...state,
            {
                id: v4(),
                title,
                author,
                message,
                cipher,
                read: false,
                created: now.toISO(),
                expires: now.plus({ minutes: 5}).toISO(),
            }
        ]
    },

    [EventTypes.DeletePost]: (state, postId) => state.filter(i => i.id !== postId),
    [EventTypes.MarkPostRead]: (state, postId) => {
        const post = state.find(i => i.postId === postId);
        const postIndex = state.indexOf(post);
        return [
            ...slice(state, 0, postIndex),
            { ...post, read: true },
            ...slice(state, postIndex + 1),
        ];
    }
};

export default genericReducer(initialState, reductionLookup);
