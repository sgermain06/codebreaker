import React from 'react';

import { makeStyles } from '@mui/styles';

import { Route, Switch, Redirect } from 'react-router';

import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';

import Sidebar from '../../components/admin/sidebar';

import Players from './players';
import PlayerEditor from './players/editor';
import Vulnerabilities from './vulnerabilities';
import VulnerabilitiesEditor from './vulnerabilities/editor';
import ScenarioBuilder from './scenarioBuilder';

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
                                <Switch>
                                    <Route exact path='/admin/players' component={Players} />
                                    <Route path='/admin/players/:id' component={PlayerEditor} />
                                    <Route exact path='/admin/vulnerabilities' component={Vulnerabilities} />
                                    <Route path='/admin/vulnerabilities/:id' component={VulnerabilitiesEditor} />
                                    <Route path='/admin/scenarioBuilder' component={ScenarioBuilder} />
                                    <Redirect to='/admin/players' />
                                </Switch>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default Admin;