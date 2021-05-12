import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

import Grid from '@material-ui/core/Grid';

import { dataSizeSuffix } from '../../lib/utils';

import styles from "./styles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles(styles);

function StationStatus(props) {
    const classes = useStyles();

    console.log(props.cpu)
    return (
        <Card className={classes.stationStatus}>
            <CardHeader className={classes.cardHeader} title={<Typography variant="h5" component="h2" className={classes.header}>Station Status</Typography>} />
            <CardContent className={classes.cardContent}>
                <Grid container>
                    <Grid item xs={8}><Typography component="h6" className={classes.sectionTitle}>CPU Cores:</Typography></Grid>
                    <Grid item xs={4}><Typography component="h6" className={classes.sectionValue}>{props.cpu.cores}</Typography></Grid>
                    <Grid item xs={8}><Typography component="h6" className={classes.sectionTitle}>Used Cores:</Typography></Grid>
                    <Grid item xs={4}><Typography component="h6" className={classes.sectionValue}>{props.cpu.usedCores}</Typography></Grid>
                    <Grid item xs={12} className={classes.cpuStatus}><Typography component="h6" className={classes.sectionTitle}>CPU is {props.cpu.usedCores > 0 ? 'processing' : 'idle'}</Typography></Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={8}><Typography component="h6" className={classes.sectionTitle}>RAM:</Typography></Grid>
                    <Grid item xs={4}><Typography component="h6" className={classes.sectionValue}>{dataSizeSuffix(props.ram.size, props.ram.dataSuffixOffset)}</Typography></Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}

StationStatus.propTypes = {
    cpu: PropTypes.shape({
        cores: PropTypes.number.isRequired,
        usedCores: PropTypes.number.isRequired
    }),
    ram: PropTypes.shape({
        size: PropTypes.number.isRequired,
    }),
};

export default StationStatus;