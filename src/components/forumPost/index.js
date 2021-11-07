import React from 'react';
import PropTypes from 'prop-types';

import IconButton from '@mui/material/IconButton';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';

import Paper from '@mui/material/Paper';

import DeleteIcon from '@mui/icons-material/DeleteTwoTone';
import EmailIcon from '@mui/icons-material/EmailTwoTone';
import DraftIcon from '@mui/icons-material/DraftsTwoTone';
import Typography from '@mui/material/Typography';

import useStyles from './styles';

function ForumPost(props) {

    const classes = useStyles();

    return (
        <Paper className={classes.container}>
            <List className={classes.list}>
                <ListItem button onClick={props.onSelect} className={classes.header}>
                    <ListItemIcon className={classes.icon}>
                        {props.read ? <DraftIcon /> : <EmailIcon />}
                    </ListItemIcon>
                    <ListItemText className={classes.titleContainer}
                        primary={
                            <Typography component="h5" variant="body1" className={classes.title} color="textPrimary">
                                {props.title}
                            </Typography>
                        }
                        secondary={
                            <Typography component="span" variant="body2" className={classes.inline} color="textPrimary">
                                {props.author}{props.created ? "- " + props.created : null}
                            </Typography>
                        }
                    />
                    <ListItemSecondaryAction className={classes.actions}>
                        <IconButton aria-label="delete" onClick={props.onDelete} size="large">
                            <DeleteIcon />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            </List>
        </Paper>
    );
}

ForumPost.propTypes = {
    read: PropTypes.bool,
    author: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    message: PropTypes.string,
    onDelete: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
}

export default ForumPost;