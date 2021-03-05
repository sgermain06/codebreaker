import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Toolbar from '@material-ui/core/Toolbar';

import styles from './styles';

import { mainListItems, secondaryListItems } from './listitems';

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
                <List>{mainListItems}</List>
                <Divider />
                <List>{secondaryListItems}</List>
            </div>
        </Drawer>
    );
}