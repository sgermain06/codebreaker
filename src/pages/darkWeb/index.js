import React from "react";
import clsx from 'clsx';
import { withRouter } from "react-router";
import makeStyles from '@mui/styles/makeStyles';

import { connect } from 'react-redux';

import Commands from '../../state/commands';

import styles from './styles';

import PageHeader from '../../components/pageHeader';
import { Button } from "@mui/material";

const useStyles = makeStyles(styles);

function DarkWeb(props) {

    const classes = useStyles();

    const handleClick = () => {
        props.enqueueSnackbar('This is my message!', { variant: 'success' })
    }

    return (
        <div className={classes.container}>
            <PageHeader />
            <div>
                <Button
                    onClick={handleClick}
                    className={clsx(classes.button, classes.success)}
                >Click me!</Button>
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
