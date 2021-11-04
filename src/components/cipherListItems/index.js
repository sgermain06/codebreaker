import React from 'react';
import * as PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';

import CheckCircleTwoToneIcon from '@material-ui/icons/CheckCircleTwoTone';

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

    return (
        !isEmpty(ciphers) ? (
            ciphers.map((cipher, index) =>
            <ListItem key={index} className={`${nested ? classes.nested : ''}`}>
                <ListItemText primary={`Algorithm: ${cipher.type.name}`} secondary={`Payout: $${cipher.blocks * cipher.payoutPerBlock}`} />
                {action &&
                    <ListItemSecondaryAction>
                        <IconButton onClick={handleAction(cipher)}>
                            <CheckCircleTwoToneIcon />
                        </IconButton>
                    </ListItemSecondaryAction>
                }
            </ListItem>)
        ) :
        <ListItem className={`${nested ? classes.nested : ''}`}>
            <ListItemText primary={empty} />
        </ListItem>
    );
}

CipherListItem.propTypes = {
    ciphers: PropTypes.arrayOf(PropTypes.object),
    action: PropTypes.func,
    nested: PropTypes.bool,
    empty: PropTypes.string,
}

export default CipherListItem;