import React from "react";

import { withRouter } from "react-router-dom";

import makeStyles from '@mui/styles/makeStyles';
import Divider from "@mui/material/Divider";

import styles from "./styles";

import { AdminListItems } from "./listitems";

const useStyles = makeStyles(styles);

function SideBar() {
    const classes = useStyles();

    return (
        <div className={classes.drawerContainer}>
            <AdminListItems />
            <Divider />
        </div>
    );
}

export default withRouter(SideBar);
