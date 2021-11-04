import React, { useEffect, useState, useRef } from "react";
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
import Tooltip from '@material-ui/core/Tooltip';
import Typography from "@material-ui/core/Typography";

import NotificationsIcon from "@material-ui/icons/Notifications";
import EmailTwoToneIcon from "@material-ui/icons/EmailTwoTone";
import PlayIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import DeleteForeverTwoToneIcon from '@material-ui/icons/DeleteForeverTwoTone';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

import AttachMoneyIcon from '@material-ui/icons/AttachMoneyTwoTone';

import styles from "./styles";
import { Button, TextField } from "@material-ui/core";

import Notifications from '../notifications';

const useStyles = makeStyles(styles);

function Header(props) {
    const classes = useStyles();
    const [mailDrawer, setMailDrawerState] = React.useState({
        right: false,
    });

    const {
        notifications
    } = props;

    const debugCurrencyAmount = useRef(null);
    const [openCurrency, setOpenCurrency] = React.useState(false);

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

    useEffect(() => {
        const headerUpdate = {
            id: 'headerUpdate',
            callback: (frames, count, expo) => {
                setFrames(Number(frames.toFixed(7)));
                setCounts(Number(count));
                setExponent(Number(expo));
            }
        };

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

    const currency = amount => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
    }

    const handleOpenCurrency = () => {
        setOpenCurrency(true);
    }
    const handleCloseCurrency = () => {
        setOpenCurrency(false);
    }

    const receiveAmount = () => {
        props.receiveCurrency(Number(debugCurrencyAmount.current.value));
        handleCloseCurrency();
    }

    const spendAmount = () => {
        props.spendCurrency(Number(debugCurrencyAmount.current.value));
        handleCloseCurrency();
    }

    const clearStore = async () => {
        await props.persistor.purge();
        window.location.reload();
    }

    return (
        <React.Fragment>
            <Dialog open={openCurrency} onClose={handleCloseCurrency}>
                <DialogTitle>Currency Debug</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Set an amount to either increase or decrease the funds by.
                    </DialogContentText>
                    <TextField autoFocus margin="dense" inputRef={debugCurrencyAmount} id="currencyAmount" label="Amount" type="number" fullWidth />
                </DialogContent>
                <DialogActions>
                    <Button onClick={receiveAmount} color="primary">Increase</Button>
                    <Button onClick={spendAmount} color="primary">Decrease</Button>
                    <Button onClick={handleCloseCurrency} color="primary">Cancel</Button>
                </DialogActions>
            </Dialog>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                    <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                        Code Breaker!
                    </Typography>
                    <div className={classes.spacer} />
                    <Typography component="h6" color="inherit" noWrap className={classes.title}>
                        [DEBUG]
                    </Typography>
                    <Tooltip title="Increase Exponent">
                        <IconButton color="inherit" onClick={increaseExponent}>
                            <KeyboardArrowUpIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Decrease Exponent">
                        <IconButton color="inherit" onClick={decreaseExponent}>
                            <KeyboardArrowDownIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Toggle Game Controller Timer">
                        <IconButton color="inherit" onClick={toggleGameLoop}>
                            {isRunning ? <PauseIcon /> : <PlayIcon />}
                        </IconButton>
                    </Tooltip>
                    <Typography component="h6" color="inherit" noWrap className={classes.title}>
                        Frames: {frames.toFixed(7)}, Counts: {counts}, Exponent: {exponent}, Value: {Math.pow(frames + counts, exponent).toFixed(7)}
                    </Typography>
                    <Tooltip title={<div align="center">Clear Redux State<br />(Refreshes Page)</div>}>
                        <IconButton color="inherit" onClick={clearStore}>
                            <DeleteForeverTwoToneIcon />
                        </IconButton>
                    </Tooltip>
                    <div className={classes.spacer} />
                    <Typography component="h6" color="inherit" noWrap className={classes.title}>
                        <Tooltip title="Set Currency">
                            <IconButton onClick={handleOpenCurrency}>
                                <AttachMoneyIcon />
                            </IconButton>
                        </Tooltip>
                        Funds: {currency(props.currency)}
                    </Typography>
                    <IconButton color="inherit" onClick={toggleDrawer('right', true)}>
                        <Badge badgeContent={7} color="secondary">
                            <React.Fragment>
                                <EmailTwoToneIcon>{'right'}</EmailTwoToneIcon>
                                <SwipeableDrawer
                                    anchor='right'
                                    open={mailDrawer['right']}
                                    onClose={toggleDrawer('right', false)}
                                    onOpen={toggleDrawer('right', true)}
                                >
                                    {list('right')}
                                </SwipeableDrawer>
                            </React.Fragment>
                        </Badge>
                    </IconButton>
                    <IconButton color="inherit" onClick={handleClick}>
                        <Badge badgeContent={notifications.length} color="secondary">
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
                            <Notifications notifications={notifications} />
                        </Box>
                    </Popover>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    );
}

Header.propTypes = {
    gameController: PropTypes.object,
    currency: PropTypes.number,
    persistor: PropTypes.object,
};

export default Header;
