import React from 'react';
import PropTypes from 'prop-types';
import { Route, withRouter } from 'react-router-dom';

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

export default withRouter(Main);
