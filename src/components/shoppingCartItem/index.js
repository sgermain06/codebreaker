import React from 'react';
import * as PropTypes from 'prop-types';
import {
    Card,
    CardContent,
    CardHeader,
    Grid,
    IconButton,
} from '@mui/material';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';

import { makeStyles } from '@mui/styles';

import styles from './styles';

const useStyles = makeStyles(styles);

function ShoppingCartItem(props) {

    const { item } = props;
    // console.log('Item:', item);
    const serverImage = require(`../../assets/servers/${item.item.asset}`);
    const logo = require(`../../assets/logos/${item.item.manufacturer}-vertical.png`);

    const classes = useStyles({ serverImage, logo });

    return (
        <Card style={{ width: '100%' }}>
            <CardHeader
                title={item.item.model}
                subheader={item.item.manufacturer}
                avatar={
                    <div className={classes.logo} />
                }
                action={
                    <IconButton
                        variant="contained"
                        onClick={() => props.onRemoveFromCart(item)}
                    ><DeleteTwoToneIcon /></IconButton>
                }
            />
            <CardContent>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Grid container spacing={2}>
                            <Grid className={classes.topGrid} item xs={12}>
                                <div className={classes.thumbnail} />
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container spacing={2}>
                                    <Grid item xs={4}>Price:</Grid>
                                    <Grid item xs={8}>{item.item.price.toLocaleString('en-us', { style: 'currency', currency: 'USD' })}</Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

ShoppingCartItem.propTypes = {
    item: PropTypes.object,
    onRemoveFromCart: PropTypes.func,
};

export default ShoppingCartItem;