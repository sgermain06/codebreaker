import React from 'react';
import * as PropTypes from 'prop-types';

import List from '@material-ui/core/List';
import NotificationItem from '../notificationItem';

function Notifications(props) {

    const {
        notifications,
    } = props;

    return (
        <List>
            {notifications.length > 0 ? 
                notifications.map((notification, index) =>
                    <NotificationItem key={index} notification={notification} />
                ) :
                <NotificationItem empty='No notification' />
            }
        </List>
    )
}

Notifications.propTypes = {
    notifications: PropTypes.array
}

export default Notifications;