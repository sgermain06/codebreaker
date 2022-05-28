import React, { useEffect, useState } from 'react';
import {
    ListItem,
    ListSubheader,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    IconButton,
    Checkbox,
} from "@mui/material";

import Clear from '@mui/icons-material/Clear';

import without from 'lodash/without';

import { makeStyles } from '@mui/styles';

import styles from './styles';

const useStyles = makeStyles(styles);

function Filter(props) {

    const classes = useStyles();

    const [ selectedOptions, setSelectedOptions ] = useState([]);

    useEffect(() => {
        props.onSelectionChange(selectedOptions);
    }, [ selectedOptions ]);

    const handleToggle = formFactor => {
        setSelectedOptions(selectedOptions.includes(formFactor) ? without(selectedOptions, formFactor) : [...selectedOptions, formFactor]);
    }

    const handleClear = () => {
        setSelectedOptions([]);
    }

    return (
        <>
            <ListSubheader style={{ display: 'flex' }}>
                <div style={{ flexGrow: 1 }}>{props.title}</div>
                <IconButton style={{
                    flexGrow: 0,
                    flexShrink: 0,
                    width: '48px'
                }}
                onClick={handleClear}><Clear /></IconButton>
            </ListSubheader>
            {props.options.map(option => 
            <ListItem key={`${props.title}-${option}`}>
                <ListItemButton onClick={() => handleToggle(option)} dense>
                    <ListItemIcon>
                        <Checkbox className={classes.checkbox} checked={selectedOptions.includes(option)} />
                    </ListItemIcon>
                    <ListItemText>{option}</ListItemText>
                </ListItemButton>
            </ListItem>
            )}
        </>
    )
}

export default Filter;