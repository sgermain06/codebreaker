import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { push } from 'connected-react-router';

import Component from './component';

import fromState from '../../../state/selectors';

const mapStateToProps = state => ({
    token: fromState.Authentication.token()(state),
});

const mapDispatchToProps = dispatch => ({
    navigateTo: (id = 'new') => dispatch(push(`/admin/vulnerabilities/${id}`)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Component));