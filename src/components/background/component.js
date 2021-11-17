import { makeStyles } from '@mui/styles';
import React from 'react';

import styles from './styles';

const useStyles = makeStyles(styles);

function Background(props) {

    const { location } = props;

    let background = require('../../assets/backgrounds/station_bg.png').default;
    try {
        background = require(`../../assets/backgrounds/${location.pathname.split('/')[1]}_bg.png`).default;
    } catch (e) {
        // Silencing error, don't care.
    }

    const classes = useStyles({ background });

    return (
        <div className={classes.container} />
    );
}

export default Background;