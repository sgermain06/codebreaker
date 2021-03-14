import React from "react";

import { withRouter } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Toolbar from "@material-ui/core/Toolbar";

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
            </div>
        </Drawer>
    );
}

export default withRouter(SideBar);
