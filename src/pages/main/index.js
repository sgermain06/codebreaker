import React from "react";
import { Route, withRouter } from "react-router-dom";

import Station from "../station";
import Servers from "../servers";
import Racks from "../racks";
import DataCenters from "../dataCenters";
import Networks from "../networks";
import DarkWeb from "../darkWeb";

export default withRouter(function Main() {
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
        </React.Fragment>
    );
});
