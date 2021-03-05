import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import clsx from 'clsx';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import Box from '@material-ui/core/Box';
import Popover from '@material-ui/core/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';

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
    const [state, setState] = React.useState({
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
    
        setState({ ...state, [anchor]: open });
      };

      const list = (anchor) => (
        <div
          className={clsx(classes.list, {
            [classes.fullList]: anchor === 'top' || anchor === 'bottom',
          })}
          role="presentation"
          onClick={toggleDrawer(anchor, false)}
          onKeyDown={toggleDrawer(anchor, false)}
        >
          <List>
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </div>
      );

    return (
        <React.Fragment>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                    <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                        Code Breaker!
                    </Typography>
                    <IconButton color="inherit">
                        <Badge badgeContent={7} color="secondary">
                            {['right'].map((anchor) => (
                            <React.Fragment key={anchor}>
                            <EmailTwoToneIcon onClick={toggleDrawer(anchor, true)}>{anchor}</EmailTwoToneIcon>
                            <SwipeableDrawer
                                anchor={anchor}
                                open={state[anchor]}
                                onClose={toggleDrawer(anchor, false)}
                                onOpen={toggleDrawer(anchor, true)}
                            >
                                {list(anchor)}
                            </SwipeableDrawer>
                            </React.Fragment>
                            ))}
                        </Badge>
                    </IconButton>
                    <IconButton color="inherit">
                        <Badge badgeContent={4} color="secondary">
                            <PopupState variant="popover" popupId="demo-popup-popover">
                                {(popupState) => (
                                <div>
                                <NotificationsIcon  variant="contained" {...bindTrigger(popupState)}/>
                                <Popover
                                    {...bindPopover(popupState)}
                                    anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'center',
                                    }}
                                    transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'center',
                                    }}
                                >
                                    <Box p={2}>
                                    <Typography>
                                    <div>Kemis likes your post about Bananas!</div>
                                    <Divider />
                                    <div>Makros went live on onlydans.com</div>
                                    <Divider />
                                    <div>Bob started bossing everyone around again.</div>
                                    </Typography>
                                    </Box>
                                </Popover>
                                </div>
                            )}
                            </PopupState>
                        </Badge>
                    </IconButton>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    );
};