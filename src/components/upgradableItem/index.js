import React from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';

import Grid from '@mui/material/Grid';

import IconButton from '@mui/material/IconButton';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import IndeterminateCheckBoxTwoToneIcon from '@mui/icons-material/IndeterminateCheckBoxTwoTone';
function UpgradableItem(props) {
    return (
        <Grid container style={{ alignItems: 'center' }}>
            <Grid item xs>
                {props.title} : {props.value} <span /> {props.suffix}
            </Grid>
            {props.upgradeAction &&
                <Grid item>
                    <IconButton onClick={props.upgradeAction} size="large">
                        <AddCircleTwoToneIcon />
                    </IconButton>
                </Grid>
            }
            {props.resetAction &&
                <Grid item>
                    <IconButton onClick={props.resetAction} size="large">
                        <IndeterminateCheckBoxTwoToneIcon color='action' />
                    </IconButton>
                </Grid>
            }
        </Grid>
    );
}

UpgradableItem.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.any,
    suffix: PropTypes.string,
    upgradeAction: PropTypes.func,
    resetAction: PropTypes.func,
};

export default withRouter(UpgradableItem);