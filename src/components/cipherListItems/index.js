import React from 'react';
import * as PropTypes from 'prop-types';

import makeStyles from '@mui/styles/makeStyles';

import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import IconButton from '@mui/material/IconButton';

import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone';

import isEmpty from 'lodash/isEmpty';

const useStyles = makeStyles((theme) => ({
    nested: {
      paddingLeft: theme.spacing(4),
    },
  })
);


function CipherListItem(props) {
    
    const classes = useStyles();

    const {
        ciphers,
        action,
        nested = false,
        empty,
    } = props;

    const handleAction = cipher => () => {
        action(cipher);
    }

    return !isEmpty(ciphers) ? (
        ciphers.map((cipher, index) =>
        <ListItem key={index} className={`${nested ? classes.nested : ''}`}>
            <ListItemText primary={`Algorithm: ${cipher.type.name}`} secondary={`Payout: $${cipher.blocks * cipher.payoutPerBlock}`} />
            {action &&
                <ListItemSecondaryAction>
                    <IconButton onClick={handleAction(cipher)} size="large">
                        <CheckCircleTwoToneIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            }
        </ListItem>)
    ) :
    <ListItem className={`${nested ? classes.nested : ''}`}>
        <ListItemText primary={empty} />
    </ListItem>;
}

CipherListItem.propTypes = {
    ciphers: PropTypes.arrayOf(PropTypes.object),
    action: PropTypes.func,
    nested: PropTypes.bool,
    empty: PropTypes.string,
}

export default CipherListItem;