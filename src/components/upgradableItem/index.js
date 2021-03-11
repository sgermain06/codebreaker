import React from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';

import IconButton from '@material-ui/core/IconButton';
import AddCircleTwoToneIcon from '@material-ui/icons/AddCircleTwoTone';
import BackspaceTwoToneIcon from '@material-ui/icons/BackspaceTwoTone';

function UpgradableItem(props) {
    return (
        <React.Fragment>
            {props.title} : {props.value} <span /> {props.suffix}
            <IconButton onClick={props.upgradeAction}>
                <AddCircleTwoToneIcon />
            </IconButton>
            {props.resetAction &&
                <IconButton onClick={props.resetAction}>
                    <BackspaceTwoToneIcon />
                </IconButton>
            }
        </React.Fragment>
    )
}

UpgradableItem.propTypes = {
    title: PropTypes.string.isRequired,
    suffix: PropTypes.string,
    upgradeAction: PropTypes.func.isRequired,
    resetAction: PropTypes.func,
};

export default withRouter(UpgradableItem);