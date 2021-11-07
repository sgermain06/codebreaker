import React from "react";
import { withRouter } from "react-router";
import makeStyles from '@mui/styles/makeStyles';

import styles from './styles';

import PageHeader from '../../components/pageHeader';

const useStyles = makeStyles(styles);

function Servers(props) {

    const classes = useStyles();

    return (
        <div className={classes.container}>
            <PageHeader />
        </div>
    );
}

export default withRouter(Servers);
