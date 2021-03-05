import React from 'react';

import { withRouter } from 'react-router';

import { makeStyles } from '@material-ui/core/styles';

import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Toolbar from '@material-ui/core/Toolbar';

import styles from './styles';

import { MainListItems, secondaryListItems } from './listitems';

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
                <List>{secondaryListItems}</List>
            </div>
        </Drawer>
    );
}

export default withRouter(SideBar);