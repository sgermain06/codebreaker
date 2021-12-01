import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';

import { withSnackbar } from 'notistack';

import fromState from '../../state/selectors';
import Commands from '../../state/commands';


function SnackbarHandler(props) {
    const {
        notifications,
        removeSnackbar,
        closeSnackbar,
        enqueueSnackbar,
    } = props;
    
    let displayed = useRef([]);
        
    useEffect(() => {
    
        const storeDisplayed = key => {
            displayed.current = [ ...displayed.current, key ]
        };
        const removeDisplayed = key => {
            displayed.current = displayed.current.filter(k => k !== key)
        };
    
        notifications.forEach(({ key, message, options = {}, dismissed = false }) => {
            if (dismissed) {
                closeSnackbar(key);
                return;
            }
    
            if (displayed.current.includes(key)) {
                return;
            }
    
            enqueueSnackbar(message, {
                key,
                ...options,
                onClose: (event, reason, key) => {
                    if (options.onClose) {
                        options.onClose(event, reason, key);
                    }
                },
                onExited: (_, key) => {
                    removeSnackbar(key);
                    removeDisplayed(key);
                },
            });
    
            storeDisplayed(key);
        });
    
    }, [notifications, displayed, closeSnackbar, enqueueSnackbar, removeSnackbar]);
    
    return (
        <>
            {props.children}
        </>
    )
}

const mapStateToProps = state => ({
    notifications: fromState.Snackbar.getNotifications()(state),
});

const mapDispatchToProps = dispatch => ({
    removeSnackbar: key => dispatch(Commands.Snackbar.removeSnackbar(key)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(SnackbarHandler));