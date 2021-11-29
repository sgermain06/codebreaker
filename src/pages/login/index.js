import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import fromState from '../../state/selectors';
import Commands from '../../state/commands';

import Component from './component';

const mapStateToProps = state => ({
    username: fromState.Authentication.rememberUsername()(state),
});

const mapDispatchToProps = dispatch => ({
    login: async ({ username, password, rememberUsername }) => 
        dispatch(Commands.Authentication.login({ username, password, rememberUsername })),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Component));