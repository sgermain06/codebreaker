import React from 'react';
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

export const mainListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <ImportantDevicesTwoToneIcon />
      </ListItemIcon>
      <ListItemText primary="Station" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <StorageTwoToneIcon />
      </ListItemIcon>
      <ListItemText primary="Servers" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <CalendarViewDayTwoToneIcon />
      </ListItemIcon>
      <ListItemText primary="Server Racks" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <ApartmentTwoToneIcon />
      </ListItemIcon>
      <ListItemText primary="Data Centers" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <RouterTwoToneIcon />
      </ListItemIcon>
      <ListItemText primary="Networks" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <PublicTwoToneIcon />
      </ListItemIcon>
      <ListItemText primary="Dark Web" />
    </ListItem>
  </div>
);

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