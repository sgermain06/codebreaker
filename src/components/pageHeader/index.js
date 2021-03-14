import React from 'react';

import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import styles from './styles';
import { mainNavigation } from '../../lib/navigation';

const useStyles = makeStyles(styles);

function PageHeader(props) {

    const classes = useStyles();

    const navItem = mainNavigation.find(obj => obj.link === props.location.pathname);
    
    return (
        <div className={classes.container}>
           {navItem.iconLarge}&nbsp;<h2 className={classes.title}>{navItem.title}</h2>
        </div>
    );
}

export default withRouter(PageHeader);