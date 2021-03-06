import React from "react";
import { withRouter } from "react-router";
import { makeStyles } from '@material-ui/core/styles';

import styles from './styles';

import PageHeader from '../../components/pageHeader';

const useStyles = makeStyles(styles);

function Racks(props) {

    const classes = useStyles();

    return (
        <div className={classes.container}>
            <PageHeader />
        </div>
    );
}

export default withRouter(Racks);
