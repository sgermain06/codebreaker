import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import {
    AppBar,
    Badge,
    Toolbar,
    IconButton,
    Typography,
} from '@material-ui/core';

import NotificationsIcon from '@material-ui/icons/Notifications';
import EmailTwoToneIcon from '@material-ui/icons/EmailTwoTone';

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
                        <Badge badgeContent={9} color="secondary">
                            <EmailTwoToneIcon />
                        </Badge>
                    </IconButton>
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