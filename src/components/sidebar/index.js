import React from "react";

import { withRouter } from "react-router-dom";

import makeStyles from '@mui/styles/makeStyles';
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";

import StationStatus from '../stationStatus';

import styles from "./styles";

import { MainListItems, SecondaryListItems } from "./listitems";

const useStyles = makeStyles(styles);

function SideBar() {
    const classes = useStyles();

    return (
        <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
                paper: classes.drawerPaper,
            }}
            open={true}
        >
            <Toolbar />
            <div className={classes.drawerContainer}>
                <Divider />
                <MainListItems />
                <Divider />
                <SecondaryListItems />
                <StationStatus className={classes.stationStatus} />
            </div>
        </Drawer>
    );
}

export default withRouter(SideBar);
