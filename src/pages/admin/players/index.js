import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { push } from 'connected-react-router';

import Component from './component';

import fromState from '../../../state/selectors';

const mapStateToProps = state => ({
    token: fromState.Authentication.token()(state),
});

const mapDispatchToProps = dispatch => ({
    navigateTo: (id = 'new') => dispatch(push(`/admin/players/${id}`)),
    disablePlayer: id => { console.log(`Disabling ${id}`)},
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Component));