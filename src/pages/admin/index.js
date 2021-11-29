import React from 'react';

import { makeStyles } from '@mui/styles';

import { Route } from 'react-router';

import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';

import Sidebar from '../../components/adminSidebar';

import Players from './players';
import Vulnerabilities from './vulnerabilities';

import styles from './styles';

const useStyles = makeStyles(styles);

function Admin(props) {

    const classes = useStyles();

    return (
        <Grid container className={classes.root}>
            <Grid item xs={12}>
                <Card className={classes.container}>
                    <CardHeader title="Admin" className={classes.header} />
                    <CardContent className={classes.content}>
                        <div className={classes.mainContainer}>
                            <Sidebar className={classes.sidebar} />
                            <div className={classes.mainContent}>
                                <Route path='/admin/players' component={Players} />
                                <Route path='/admin/vunerabilities' component={Vulnerabilities} />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default Admin;