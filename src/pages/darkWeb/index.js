import React from "react";
import clsx from 'clsx';
import { withRouter } from "react-router";
import { makeStyles } from '@material-ui/core/styles';
import { withSnackbar } from 'notistack';

import styles from './styles';

import PageHeader from '../../components/pageHeader';
import { Button } from "@material-ui/core";

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

export default withRouter(withSnackbar(DarkWeb));
