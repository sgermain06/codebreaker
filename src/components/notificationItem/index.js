import React from 'react';
import * as PropTypes from 'prop-types';

import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import WarningTwoToneIcon from '@mui/icons-material/WarningTwoTone';
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone';
import CancelTwoToneIcon from '@mui/icons-material/CancelTwoTone';
import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone';
import isEmpty from 'lodash/isEmpty';

function NotificationItem(props) {

    const {
        notification,
        empty,
    } = props;

    let icon = InfoTwoToneIcon;
    if (!isEmpty(notification)) {
        switch(notification.level) {
            case 'success':
                icon = <CheckCircleTwoToneIcon />;
                break;
            case 'warning':
                icon = <WarningTwoToneIcon />;
                break;
            case 'error':
                icon = <CancelTwoToneIcon />;
                break;
            default:
                icon = <InfoTwoToneIcon />;
                break;
        }
    }

    return (
        <ListItem>
            {!isEmpty(notification) ?
                <>
                    <ListItemIcon>{icon}</ListItemIcon>
                    <ListItemText primary={notification.message} />
                </> :
                <ListItemText primary={empty} />
            }
        </ListItem>
    );
}

NotificationItem.propTypes = {
    notification: PropTypes.shape({
        level: PropTypes.string,
        message: PropTypes.string.isRequired,
        obj: PropTypes.object,
    }),
    empty: PropTypes.string,
}

export default NotificationItem;