import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";

import { NavLink, withRouter } from "react-router-dom";
import { mainNavigation, secondaryNavigation } from '../../lib/navigation';

function ListItemNavLink(props) {
    const { to: toLink } = props;
    return (
        <ListItem selected={props.location.pathname === toLink} button component={NavLink} to={toLink}>
            {props.children}
        </ListItem>
    );
}

export const MainListItems = withRouter(function mainItems(props) {
    return (
        <List>
            {mainNavigation.map((item, key) =>
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

export const SecondaryListItems = withRouter(function secondaryItems(props) {
    return (
        <List>
            <ListSubheader inset>Hub</ListSubheader>
            {secondaryNavigation.map((item, key) =>
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
