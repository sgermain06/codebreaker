import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

import clsx from "clsx";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";

import Box from "@material-ui/core/Box";
import Popover from "@material-ui/core/Popover";

import AppBar from "@material-ui/core/AppBar";
import Badge from "@material-ui/core/Badge";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import NotificationsIcon from "@material-ui/icons/Notifications";
import EmailTwoToneIcon from "@material-ui/icons/EmailTwoTone";
import PlayIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";

import styles from "./styles";

const useStyles = makeStyles(styles);

function Header(props) {
    const classes = useStyles();
    const [mailDrawer, setMailDrawerState] = React.useState({
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event && event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
            return;
        }

        setMailDrawerState({ ...mailDrawer, [anchor]: open });
    };
    const list = (anchor) => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === "top" || anchor === "bottom",
            })}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {["All mail", "Trash", "Spam"].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
        </div>
    );
    //End mailDrawer code block

    //Begin popover handling
    const [popoverAnchor, setPopoverAnchor] = React.useState(null);
    const open = !!popoverAnchor;

    const handleClick = (event) => {
        setPopoverAnchor(event.currentTarget);
    };

    const handleClose = () => {
        setPopoverAnchor(null);
    };
    //End popover codeblock

    //Begin game loop handling
    const [isRunning, setIsRunning] = useState(props.gameController.isRunning());
    const [processLoaded, setProcessLoaded] = useState(false);
    const [frames, setFrames] = useState(0);
    const [counts, setCounts] = useState(0);
    const [exponent, setExponent] = useState(0);

    const toggleGameLoop = () => {
        setIsRunning(props.gameController.toggleGameLoop());
    };

    const headerUpdate = (frames, count, expo) => {
        setFrames(Number(frames.toFixed(7)));
        setCounts(Number(count));
        setExponent(Number(expo));
    };

    useEffect(() => {
        if (!processLoaded) {
            props.gameController.addProcess(headerUpdate);
            setProcessLoaded(true);
        }
    }, [processLoaded, props.gameController]);

    const increaseExponent = () => {
        props.gameController.increaseExponent();
    };

    const decreaseExponent = () => {
        props.gameController.decreaseExponent();
    };
    //End game loop handling

    return (
        <React.Fragment>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                    <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                        Code Breaker!
                    </Typography>
                    <div className={classes.spacer} />
                    <Typography component="h6" color="inherit" noWrap className={classes.title}>
                        [DEBUG]
                    </Typography>
                    <IconButton color="inherit" onClick={increaseExponent}>
                        <KeyboardArrowUpIcon />
                    </IconButton>
                    <IconButton color="inherit" onClick={decreaseExponent}>
                        <KeyboardArrowDownIcon />
                    </IconButton>
                    <IconButton color="inherit" onClick={toggleGameLoop}>
                        {isRunning ? <PauseIcon /> : <PlayIcon />}
                    </IconButton>
                    <Typography component="h6" color="inherit" noWrap className={classes.title}>
                        Frames: {frames.toFixed(7)}, Counts: {counts}, Exponent: {exponent}, Value: {Math.pow(frames + counts, exponent).toFixed(7)}
                    </Typography>
                    <div className={classes.spacer} />
                    <IconButton color="inherit">
                        <Badge badgeContent={7} color="secondary">
                            {["right"].map((anchor) => (
                                <React.Fragment key={anchor}>
                                    <EmailTwoToneIcon onClick={toggleDrawer(anchor, true)}>{anchor}</EmailTwoToneIcon>
                                    <SwipeableDrawer
                                        anchor={anchor}
                                        open={mailDrawer[anchor]}
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
                        <Badge badgeContent={4} color="secondary" onClick={handleClick}>
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                    <Popover
                        open={open}
                        anchorEl={popoverAnchor}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "center",
                        }}
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "center",
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
                </Toolbar>
            </AppBar>
        </React.Fragment>
    );
}

Header.propTypes = {
    gameController: PropTypes.object,
};

export default Header;
