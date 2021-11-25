import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { withSnackbar } from 'notistack';

import fromState from '../../state/selectors';
import Commands from '../../state/commands';

import Station from '../station';
import Servers from '../servers';
import Racks from '../racks';
import DataCenters from '../dataCenters';
import Networks from '../networks';
import DarkWeb from '../darkWeb';
import NeuralNet from '../neuralNet';
import Forums from '../forums';
import Upgrades from '../upgrades';
import Statistics from '../statistics';
function Main(props) {

    const {
        notifications,
        removeSnackbar,
        closeSnackbar,
        enqueueSnackbar,
    } = props;

    let displayed = useRef([]);
        
    useEffect(() => {

        const storeDisplayed = key => {
            displayed.current = [ ...displayed.current, key ]
        };
        const removeDisplayed = key => {
            displayed.current = displayed.current.filter(k => k !== key)
        };
    
        notifications.forEach(({ key, message, options = {}, dismissed = false }) => {
            if (dismissed) {
                closeSnackbar(key);
                return;
            }

            if (displayed.current.includes(key)) {
                return;
            }

            enqueueSnackbar(message, {
                key,
                ...options,
                onClose: (event, reason, key) => {
                    if (options.onClose) {
                        options.onClose(event, reason, key);
                    }
                },
                onExited: (_, key) => {
                    removeSnackbar(key);
                    removeDisplayed(key);
                },
            });

            storeDisplayed(key);
        });

    }, [notifications, displayed, closeSnackbar, enqueueSnackbar, removeSnackbar]);

    return (
        <>
            <Route exact path='/'>
                <Station gameController={props.gameController} />
            </Route>
            <Route path='/servers'>
                <Servers />
            </Route>
            <Route path='/racks'>
                <Racks />
            </Route>
            <Route path='/dataCenters'>
                <DataCenters />
            </Route>
            <Route path='/networks'>
                <Networks />
            </Route>
            <Route path='/darkWeb'>
                <DarkWeb terminalController={props.terminalController} />
            </Route>
            <Route path='/neuralNet'>
                <NeuralNet gameController={props.gameController} />
            </Route>
            <Route path='/forums'>
                <Forums gameController={props.gameController} />
            </Route>
            <Route path='/upgrades'>
                <Upgrades />
            </Route>
            <Route path='/stats'>
                <Statistics />
            </Route>
        </>
    );
}

Main.propTypes = {
    gameController: PropTypes.object,
    terminalController: PropTypes.object,
};

const mapStateToProps = state => ({
    notifications: fromState.Snackbar.getNotifications()(state),
});

const mapDispatchToProps = dispatch => ({
    removeSnackbar: key => dispatch(Commands.Snackbar.removeSnackbar(key)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(withRouter(Main)));
