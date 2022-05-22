import React from "react";
import makeStyles from '@mui/styles/makeStyles';

import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import styles from './styles';

import PageHeader from '../../components/pageHeader';

const useStyles = makeStyles(styles);

function DataCenters() {

    const classes = useStyles();

    return (
        <div className={classes.container}>
            <PageHeader />
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Card>
                        <CardContent className={classes.description}>
                            <p>Here, you can rent datacenter resources, like racks to install servers in, configure your uplink, etc. Servers will increase your income, without needing constant monitoring. Think about it as some sort of fire and forget mechanism that just allows you to make money.</p>
                            <p>On the other hand, each datacenter resources you install and utilize will have an associated cost. Each rack has a specific amount of power allocated, at a specific rate.</p>
                            <p>You have multiple options on where to buy servers. You can install brand-new hardware, directly from the manufacturer and installed by our professional staff, or install used hardware that you can purchase yourself either on the black market or some online auction website.</p>
                            <p>There is a possibility to purchase additional power circuits to power more hardware or upgrade your uplink to the internet, for an additional fee.</p>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
}

export default DataCenters;
