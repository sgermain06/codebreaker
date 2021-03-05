import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import {
    Divider,
    Drawer,
    List,
    Toolbar,
} from '@material-ui/core';

import styles from './styles';

const useStyles = makeStyles(styles);

export default function SideBar(props) {

    const classes = useStyles();

    console.log('Drawer open:', props.drawerOpen);
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
                <List>{props.mainListItems}</List>
                <Divider />
                <List>{props.secondaryListItems}</List>
            </div>
        </Drawer>
    );
}