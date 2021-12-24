import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import fromState from '../../state/selectors';

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
import Scenarios from './scenarios';
import ScenarioBuilder from './scenarios/editor';

import Loader from 'react-loader-spinner';

import styles from './styles';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

const useStyles = makeStyles(styles);

function Admin(props) {

    const {
        isLoading,
    } = props;

    const classes = useStyles();

    return (
        <>
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
                                        <Route exact path='/admin/scenarios' component={Scenarios} />
                                        <Route path='/admin/scenarios/:id' component={ScenarioBuilder} />
                                        <Redirect to='/admin/players' />
                                    </Switch>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <div className={classes.loader} style={{
                display: isLoading ? 'flex' : 'none',
            }}>
                <Loader type="TailSpin" color="#00BFFF" height={100} width={100} />
            </div>
        </>
    );
};

const mapStateToProps = state => ({
    isLoading: fromState.Loader.isLoading()(state),
});

export default connect(mapStateToProps)(Admin);