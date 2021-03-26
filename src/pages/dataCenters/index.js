import React from "react";
import { withRouter } from "react-router";
import { makeStyles } from '@material-ui/core/styles';

import styles from './styles';

import PageHeader from '../../components/pageHeader';

const useStyles = makeStyles(styles);

function DataCenters() {

    const classes = useStyles();

    return (
        <div className={classes.container}>
            <PageHeader />
        </div>
    );
}

export default withRouter(DataCenters);
