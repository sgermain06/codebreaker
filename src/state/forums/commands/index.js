import Events from '../events';

const returnObj = {
    createPost: (title, author, message, cipher) => dispatch => dispatch(Events.CreatePost(title, author, message, cipher)),
    markAsRead: postId => dispatch => dispatch(Events.MarkAsRead(postId)),
    deletePost: postId => dispatch => dispatch(Events.DeletePost(postId)),
};

export default returnObj;