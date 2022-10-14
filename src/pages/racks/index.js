import React from 'react';
import { withRouter } from 'react-router';
import makeStyles from '@mui/styles/makeStyles';

import styles from './styles';

import PageHeader from '../../components/pageHeader';

import ServerRack from '../../components/serverRack';

const useStyles = makeStyles(styles);

function Racks(props) {

    const classes = useStyles();

    const servers = [
        {
            manufacturer: 'Parallax Solutions',
            formFactor: 2,
            storage: {
                amount: 24,
                size: 2.5,
                orientation: 'vertical'
            },
            panel: {
                position: 'left',
            }
        },
        {
            manufacturer: 'Parallax Solutions',
            formFactor: 1,
            storage: {
                amount: 10,
                size: 2.5,
                orientation: 'horizontal'
            },
            panel: {
                position: 'left',
            }
        },
        {
            manufacturer: 'Parallax Solutions',
            formFactor: 4,
            storage: {
                amount: 20,
                size: 3.5,
                orientation: 'horizontal'
            },
            panel: {
                position: 'left',
            }
        }
    ];

    return (
        <div className={classes.container}>
            <PageHeader />
            <ServerRack servers={servers} />
        </div>
    );
}

export default withRouter(Racks);
