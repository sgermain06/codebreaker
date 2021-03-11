import React from "react";
import PropTypes from 'prop-types';
import { Route, withRouter } from "react-router-dom";

import Station from "../station";
import Servers from "../servers";
import Racks from "../racks";
import DataCenters from "../dataCenters";
import Networks from "../networks";
import DarkWeb from "../darkWeb";
import NeuralNet from "../neuralNet";

function Main(props) {
    return (
        <React.Fragment>
            <Route exact path="/">
                <Station />
            </Route>
            <Route path="/servers">
                <Servers />
            </Route>
            <Route path="/racks">
                <Racks />
            </Route>
            <Route path="/dataCenters">
                <DataCenters />
            </Route>
            <Route path="/networks">
                <Networks />
            </Route>
            <Route path="/darkWeb">
                <DarkWeb />
            </Route>
            <Route path="/neuralNet">
                <NeuralNet gameController={props.gameController} />
            </Route>
        </React.Fragment>
    );
}

Main.propTypes = {
    gameController: PropTypes.object
};

export default withRouter(Main);
