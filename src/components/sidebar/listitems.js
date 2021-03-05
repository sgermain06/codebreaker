import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import ImportantDevicesTwoToneIcon from '@material-ui/icons/ImportantDevicesTwoTone';
import StorageTwoToneIcon from '@material-ui/icons/StorageTwoTone';
import CalendarViewDayTwoToneIcon from '@material-ui/icons/CalendarViewDayTwoTone';
import ApartmentTwoToneIcon from '@material-ui/icons/ApartmentTwoTone';
import RouterTwoToneIcon from '@material-ui/icons/RouterTwoTone';
import PublicTwoToneIcon from '@material-ui/icons/PublicTwoTone';
import PublishTwoToneIcon from '@material-ui/icons/PublishTwoTone';
import SettingsBackupRestoreTwoToneIcon from '@material-ui/icons/SettingsBackupRestoreTwoTone';
import AssignmentIcon from '@material-ui/icons/Assignment';

import { NavLink, withRouter } from 'react-router-dom';

function ListItemNavLink(props) {
    const {to: toLink} = props;
    return (
        <ListItem selected={props.location.pathname === toLink} button component={NavLink} to={toLink}>
            {props.children}
        </ListItem>
    );
}

export const MainListItems = withRouter(function mainItems(props) {
    return (
        <List>
            <ListItemNavLink to="/" {...props}>
                <ListItemIcon>
                    <ImportantDevicesTwoToneIcon />
                </ListItemIcon>
                <ListItemText primary="Station" />
            </ListItemNavLink>
            <ListItemNavLink to="/servers" {...props}>
                <ListItemIcon>
                    <StorageTwoToneIcon />
                </ListItemIcon>
                <ListItemText primary="Servers" />
            </ListItemNavLink>
            <ListItemNavLink to="/racks" {...props}>
                <ListItemIcon>
                    <CalendarViewDayTwoToneIcon />
                </ListItemIcon>
                <ListItemText primary="Server Racks" />
            </ListItemNavLink>
            <ListItemNavLink to="/dataCenters" {...props}>
                <ListItemIcon>
                    <ApartmentTwoToneIcon />
                </ListItemIcon>
                <ListItemText primary="Data Centers" />
            </ListItemNavLink>
            <ListItemNavLink to="/networks" {...props}>
                <ListItemIcon>
                    <RouterTwoToneIcon />
                </ListItemIcon>
                <ListItemText primary="Networks" />
            </ListItemNavLink>
            <ListItemNavLink to="/darkWeb" {...props}>
                <ListItemIcon>
                    <PublicTwoToneIcon />
                </ListItemIcon>
                <ListItemText primary="Dark Web" />
            </ListItemNavLink>
        </List>
    );
});


export const secondaryListItems = (
  <div>
    <ListSubheader inset>Hub</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <PublishTwoToneIcon />
      </ListItemIcon>
      <ListItemText primary="Perm Upgrades" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <SettingsBackupRestoreTwoToneIcon />
      </ListItemIcon>
      <ListItemText primary="Prestige" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Stats" />
    </ListItem>
  </div>
);