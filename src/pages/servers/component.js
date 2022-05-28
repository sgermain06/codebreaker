import React, { useEffect, useState } from "react";
import makeStyles from '@mui/styles/makeStyles';

import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Menu,
    MenuItem,
} from "@mui/material";

import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone';

import styles from './styles';

import PageHeader from '../../components/pageHeader';

import serversData from '../../components/serverComponent/servers.json';
import ServerStore from '../../components/serverStore';
import ShoppingCart from '../../components/shoppingCart';

import uniq from 'lodash/uniq';
import last from 'lodash/last';

const useStyles = makeStyles(styles);

const manufacturers = uniq(serversData.map(s => s.manufacturer));
// [
//     'Procyon',
//     'Ellipsis Compute Cloud',
//     'Digitech Integrated',
//     'Parallax Solutions',
// ];

function Servers(props) {

    const classes = useStyles();
    const [ openModal, setOpenModal ] = useState(false);
    const [ openNewMenu, setOpenNewMenu ] = useState(false);
    const [ chosenManufacturer, setChosenManufacturer ] = useState(null);
    const [ anchorEl, setAnchorEl ] = useState(null);
    const [ dialogContent, setDialogContent ] = useState([]);

    const handleNew = (manufacturer) => {
        setOpenNewMenu(false);
        setChosenManufacturer(manufacturer);
    };

    const handleOpenMenu = evt => {
        setAnchorEl(evt.currentTarget);
        setOpenNewMenu(true);
    };

    const handleUsed = () => {
        setChosenManufacturer('Used Server');
        setOpenModal(true);
    };

    const closeModal = () => {
        setChosenManufacturer(null);
        setOpenModal(false);
    };

    const handleCloseMenu = () => {
        setOpenNewMenu(false);
        setAnchorEl(null);
    };

    const handleAddToCart = item => {
        console.log('Adding to cart!', item);
        props.addItem(item);
    }

    const handleCheckout = () => {
        const checkout = <ShoppingCart />
        setDialogContent([...dialogContent, checkout]);
    }

    const handleBack = () => {
        dialogContent.pop();
        setDialogContent([...dialogContent]);
    }

    useEffect(() => {
        if (chosenManufacturer) {
            const serverStore = <ServerStore
                data={serversData.filter(i => i.manufacturer === chosenManufacturer)}
                manufacturer={chosenManufacturer}
                onAddToCart={handleAddToCart} />;

            setDialogContent([serverStore]);
            setOpenModal(true);
        }
    }, [chosenManufacturer]);

    return (
        <div className={classes.container}>
            <PageHeader />
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <p>From this page, you can source servers.</p>
                            <Grid container spacing={2}>
                                <Grid item xs={2}>
                                    <Button
                                        variant="contained"
                                        onClick={handleOpenMenu}
                                        endIcon={<KeyboardArrowDown />}
                                    >Purchase New Hardware</Button>
                                </Grid>
                                <Grid item xs={2}><Button variant="contained" onClick={handleUsed}>Purchase Used Hardware</Button></Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <Dialog
                open={openModal}
                onClose={closeModal}
                fullWidth
                maxWidth='xl'
                PaperProps={{ style: {
                    height: 'calc(100% - 64px)'
                }}}
            >
                <DialogTitle style={{
                    display: 'flex',
                    justifyContent: 'space-between'
                }}>
                    <Grid container spacing={2}>
                        {dialogContent.length > 1 && <Grid item xs={1}><Button onClick={handleBack} variant='contained' startIcon={<ArrowBackTwoToneIcon />}>Back</Button></Grid>}
                        <Grid item xs>Buying Hardware - {chosenManufacturer}</Grid>
                    </Grid>
                    {dialogContent.length <= 1 &&<Button style={{ whiteSpace: 'nowrap' }} variant='contained' onClick={handleCheckout}>Checkout ({props.cart.length})</Button>}
                </DialogTitle>
                <DialogContent>
                    {last(dialogContent)}
                </DialogContent>
                <DialogActions>
                    <Button variant='contained' onClick={closeModal}>Close</Button>
                </DialogActions>
            </Dialog>
            <Menu
                open={openNewMenu}
                onClose={handleCloseMenu}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
            >
                { manufacturers.map((manufacturer, key) => 
                    <MenuItem
                        key={`Manufacturer-${key}`}
                        onClick={() => handleNew(manufacturer)}
                    >{manufacturer}</MenuItem>
                )}
            </Menu>
        </div>
    );
}

export default Servers;
