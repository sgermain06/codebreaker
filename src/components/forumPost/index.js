import React from 'react';
import PropTypes from 'prop-types';

import IconButton from '@material-ui/core/IconButton';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import Paper from '@material-ui/core/Paper';

import DeleteIcon from '@material-ui/icons/DeleteTwoTone';
import EmailIcon from '@material-ui/icons/EmailTwoTone';
import DraftIcon from '@material-ui/icons/DraftsTwoTone';
import Typography from '@material-ui/core/Typography';

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
                        <IconButton aria-label="delete" onClick={props.onDelete}>
                            <DeleteIcon />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            </List>
        </Paper>
    )
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