import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Badge from '@material-ui/core/Badge';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import NotificationsIcon from '@material-ui/icons/Notifications';

import styles from './styles';

const useStyles = makeStyles(styles);

export default function Header() {
    const classes = useStyles();

    return (
        <React.Fragment>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                    <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                        Code Breaker!
                    </Typography>
                    <IconButton color="inherit">
                        <Badge badgeContent={4} color="secondary">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    );
};