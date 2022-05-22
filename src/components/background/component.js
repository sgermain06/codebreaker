import React from 'react';
import { makeStyles } from '@mui/styles';

import styles from './styles';

const useStyles = makeStyles(styles);

function Background(props) {

    const { location } = props;

    let background = require('../../assets/backgrounds/station_bg.png');
    try {
        background = require(`../../assets/backgrounds/${location.pathname.split('/')[1]}_bg.png`);
    } catch (e) {
        // Silencing error, don't care.
    }

    const classes = useStyles({ background });

    return (
        <div className={classes.container} />
    );
}

export default Background;