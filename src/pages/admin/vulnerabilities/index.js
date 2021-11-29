import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Component from './component';

import fromState from '../../../state/selectors';

const mapStateToProps = state => ({
    token: fromState.Authentication.token()(state),
});

export default connect(mapStateToProps)(withRouter(Component));