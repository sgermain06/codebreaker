import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { generateCipher } from '../../lib/ciphers';

import Component from './component';

import Commands from '../../state/commands';
import fromState from '../../state/selectors';

const mapStateToProps = state => ({
    posts: fromState.Forums.activePosts()(state),
});

const mapDispatchToProps = dispatch => ({
    markAsRead: postId => dispatch(Commands.Forums.markAsRead(postId)),
    deletePost: postId => dispatch(Commands.Forums.deletePost(postId)),
    createPost: (title, author, message, cipher) => dispatch(Commands.Forums.createPost(title, author, message, cipher)),
    generateCipher,
});

const component = withRouter(Component);

export default connect(mapStateToProps, mapDispatchToProps)(component);