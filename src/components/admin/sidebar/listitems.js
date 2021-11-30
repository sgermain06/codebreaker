import React from "react";
import makeStyles from '@mui/styles/makeStyles';

import List from "@mui/material/List";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import { NavLink, withRouter } from "react-router-dom";
import { adminNavigation } from '../../../lib/navigation';

import styles from './styles';
const useStyles = makeStyles(styles);

function ListItemNavLink(props) {
    const classes = useStyles();
    const { to: toLink } = props;
    return (
        <ListItemButton
            className={classes.listItem}
            selected={props.location.pathname === toLink}
            component={NavLink}
            to={toLink}
        >
            {props.children}
        </ListItemButton>
    );
}

export const AdminListItems = withRouter(function mainItems(props) {
    return (
        <List>
            {adminNavigation.map((item, key) =>
                <ListItemNavLink key={key} to={item.link} {...props}>
                    <ListItemIcon>
                        {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.title} />
                </ListItemNavLink>
            )}
        </List>
    );
});