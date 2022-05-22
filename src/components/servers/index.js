import React, { useEffect, useState } from 'react';
import * as PropTypes from 'prop-types';
import {
    Card,
    CardContent,
    CardHeader,
    Grid,
    List,
    ListItem,
    ListItemIcon,
    Button,
} from '@mui/material';

import StorageTwoToneIcon from '@mui/icons-material/StorageTwoTone';
import MemoryTwoToneIcon from '@mui/icons-material/MemoryTwoTone';
import SimCardTwoToneIcon from '@mui/icons-material/SimCardTwoTone';
import CompareArrowsTwoToneIcon from '@mui/icons-material/CompareArrowsTwoTone';
import NetworkCheckTwoToneIcon from '@mui/icons-material/NetworkCheckTwoTone';
import ElectricalServicesTwoToneIcon from '@mui/icons-material/ElectricalServicesTwoTone';
import EvStationTwoToneIcon from '@mui/icons-material/EvStationTwoTone';
import SaveTwoToneIcon from '@mui/icons-material/SaveTwoTone';
import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';

import { makeStyles } from '@mui/styles';

import styles from './styles';

const useStyles = makeStyles(styles);

function ServerComponent(props) {

    const { server } = props;

    const descriptions = {
        formFactor: {
            description: 'Form Factor',
            icon: <StorageTwoToneIcon />,
        },
        cpu: {
            description: 'CPU(s)',
            icon: <MemoryTwoToneIcon />,
        },
        ramSlots: {
            description: 'RAM Slot(s)',
            icon: <SimCardTwoToneIcon />,
        },
        lanPorts: {
            description: 'LAN Port(s)',
            icon: <CompareArrowsTwoToneIcon />,
        },
        lanSpeed: {
            description: 'LAN Speed',
            icon: <NetworkCheckTwoToneIcon />,
        },
        powerSupplies: {
            description: 'Power Supply(ies)',
            icon: <ElectricalServicesTwoToneIcon />,
        },
        powerConsumption: {
            description: 'Max. Power Consumption',
            icon: <EvStationTwoToneIcon />,
        },
        storageBays: {
            description: 'Storage Bay(s)',
            icon: <SaveTwoToneIcon />,
        },
    };

    const serverImage = require(`../../assets/servers/${server.asset}`);
    const logo = require(`../../assets/logos/${server.manufacturer}-vertical.png`);

    const classes = useStyles({ serverImage, logo });

    return (
        <Card style={{ width: '100%' }}>
            <CardHeader
                title={server.model}
                subheader={server.manufacturer}
                avatar={
                    <div className={classes.logo} />
                }
                action={
                    <Button
                        variant="contained"
                        startIcon={<ShoppingCartTwoToneIcon />}
                        onClick={() => props.onAddToCart(server)}
                    >Add To Cart</Button>
                }
            />
            <CardContent>
                <Grid container spacing={2}>
                    <Grid className={classes.topGrid} item xs={3}><div className={classes.thumbnail} /></Grid>
                    <Grid className={classes.topGrid} item xs>
                        <Grid container spacing={2}>
                            {Object.keys(descriptions).map((key, index) =>
                            <Grid item xs={6} key={`ServerKey-${index}`}>
                                <Grid container spacing={2}>
                                    <Grid item xs={4}>{descriptions[key].description}</Grid>
                                    <Grid item xs={8}>{server[key]}</Grid>
                                </Grid>
                            </Grid>
                            )}
                            <Grid item xs={4}>Price:</Grid>
                            <Grid item xs={8}>{server.price.toLocaleString('en-us', { style: 'currency', currency: 'USD' })}</Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}

ServerComponent.propTypes = {
    server: PropTypes.shape({
        model: PropTypes.string,
        asset: PropTypes.string,
        formFactor: PropTypes.number,
        cpu: PropTypes.number,
        ramSlots: PropTypes.number,
        lanPorts: PropTypes.number,
        lanSpeed: PropTypes.number,
        powerSupplies: PropTypes.number,
        powerConsumption: PropTypes.number,
        storageBays: PropTypes.number
    }),
    onAddToCart: PropTypes.func,
};

export default ServerComponent;