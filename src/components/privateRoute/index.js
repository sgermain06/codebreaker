import React from 'react';
import * as PropTypes from 'prop-types';

import { connect } from 'react-redux';

import fromState from '../../state/selectors';
import Commands from '../../state/commands';

import { withRouter } from 'react-router';
import { Route } from 'react-router';

import isEmpty from 'lodash/isEmpty';

function PrivateRoute(props) {

    const {
        path,
        token,
        redirectTo,
        setRedirectTo,
        redirect,
    } = props;

    if (isEmpty(token)) {
        setRedirectTo(path);
        redirect(redirectTo);
    }

    return <Route {...props} />;
}

const mapStateToProps = state => ({
    token: fromState.Authentication.token()(state),
});

const mapDispatchToProps = dispatch => ({
    setRedirectTo: redirectTo => dispatch(Commands.Authentication.setRedirectTo(redirectTo)),
    redirect: redirectTo => dispatch(Commands.Authentication.redirect(redirectTo)),
});

PrivateRoute.propTypes = {
    redirectTo: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PrivateRoute));