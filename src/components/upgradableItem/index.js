import React from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';

import IconButton from '@material-ui/core/IconButton';
import AddCircleTwoToneIcon from '@material-ui/icons/AddCircleTwoTone';
import BackspaceTwoToneIcon from '@material-ui/icons/BackspaceTwoTone';

function UpgradableItem(props) {
    return (
        <Grid container style={{
            alignItems: 'center'
        }}>
            <Grid item xs>
                {props.title} : {props.value} <span /> {props.suffix}
            </Grid>
            <Grid item>
                <IconButton onClick={props.upgradeAction}>
                    <AddCircleTwoToneIcon />
                </IconButton>
            </Grid>
            {props.resetAction &&
                <Grid item>
                    <IconButton onClick={props.resetAction}>
                        <BackspaceTwoToneIcon />
                    </IconButton>
                </Grid>
            }
        </Grid>
    )
}

UpgradableItem.propTypes = {
    title: PropTypes.string.isRequired,
    suffix: PropTypes.string,
    upgradeAction: PropTypes.func.isRequired,
    resetAction: PropTypes.func,
};

export default withRouter(UpgradableItem);