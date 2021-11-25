import React from "react";
import { withRouter } from "react-router";
import makeStyles from '@mui/styles/makeStyles';

import { connect } from 'react-redux';

import Commands from '../../state/commands';

import styles from './styles';

import PageHeader from '../../components/pageHeader';
import Terminal from '../../components/terminal';

const useStyles = makeStyles(styles);

function DarkWeb(props) {

    const classes = useStyles();

    return (
        <div className={classes.container}>
            <PageHeader />
            <div className={classes.fullHeight}>
                <Terminal terminalController={props.terminalController} />
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
    enqueueSnackbar: (message, options) => dispatch(Commands.Snackbar.enqueueSnackbar(message, options)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DarkWeb));
