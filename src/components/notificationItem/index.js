import React from 'react';
import * as PropTypes from 'prop-types';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import WarningTwoToneIcon from '@material-ui/icons/WarningTwoTone';
import CheckCircleTwoToneIcon from '@material-ui/icons/CheckCircleTwoTone';
import CancelTwoToneIcon from '@material-ui/icons/CancelTwoTone';
import InfoTwoToneIcon from '@material-ui/icons/InfoTwoTone';
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