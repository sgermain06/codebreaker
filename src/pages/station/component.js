import React from 'react';

import makeStyles from '@mui/styles/makeStyles';
import Grid from "@mui/material/Grid";

import PageHeader from "../../components/pageHeader";
import CipherWidget from '../../components/widgets/cipherBreak';
import CipherQueueWidget from '../../components/widgets/cipherQueue';
import CpuLoadWidget from '../../components/widgets/cpuLoad';
import AllCpuLoadAverageWidget from '../../components/widgets/allCpuLoadAverage';
import NetworkActivity from '../../components/widgets/networkActivity';

import styles from "./styles";

import "../../App.css";

const useStyles = makeStyles(styles);

function Station(props) {
    const classes = useStyles();
    const {
        gameController
    } = props;

    return (
        <div className={classes.container}>
            <PageHeader />
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={6} lg={3}>
                    <AllCpuLoadAverageWidget height={250} />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={9}>
                    <NetworkActivity height={250} />
                </Grid>
                <Grid item xs={12}>
                    <CpuLoadWidget gameController={gameController} height={300} />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={4}>
                    <CipherWidget gameController={gameController} width={20} height={10} />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={4}>
                    <CipherQueueWidget />
                </Grid>
            </Grid>
        </div>
    );
}

export default Station;