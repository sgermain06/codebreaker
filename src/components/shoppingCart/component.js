import React, { useEffect, useState } from 'react';

import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import ShoppingCartItem from '../shoppingCartItem';

import isNil from 'lodash/isNil';
import get from 'lodash/get';
import { Card, CardContent } from '@mui/material';

function ShoppingCart(props) {

    // console.log('Cart:', props.cart);
    // console.log('Cart Total:', props.cartPrice);

    const [ dialogOpen, setDialogOpen ] = useState(false);
    const [ selectedItem, setSelectedItem ] = useState(null);

    useEffect(() => {
        if (!isNil(selectedItem)) {
            setDialogOpen(true);
        }
    }, [ selectedItem ])

    const handleRemove = item => {
        setSelectedItem(item);
    }

    const performRemove = () => {
        props.removeItem(selectedItem);
        handleClose();
    }

    const handleClose = () => {
        setDialogOpen(false);
        setSelectedItem(null);
    }

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Card>
                        <CardContent>Cart Total: {props.cartPrice.toLocaleString('en-us', { style: 'currency', currency: 'usd' })}</CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        {props.cart.map(item =>
                            <Grid item xs={3} key={item.id}>
                                <ShoppingCartItem item={item} onRemoveFromCart={handleRemove} />
                            </Grid>
                        )}
                    </Grid>
                </Grid>
            </Grid>
            <Dialog
                open={dialogOpen}
                onClose={handleClose}
            >
                <DialogTitle>Remove Item</DialogTitle>
                <DialogContent>
                    <DialogContentText>Are you sure you want to delete {get(selectedItem, 'item.model')}?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} autoFocus>Cancel</Button>
                    <Button onClick={performRemove}>Remove</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default ShoppingCart;