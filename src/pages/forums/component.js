import React, { useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

import TextField from '@material-ui/core/TextField';

import PageHeader from '../../components/pageHeader';
import ForumPost from '../../components/forumPost';

import styles from './styles';

const useStyles = makeStyles(styles);

export default function Forums(props) {

    const [openNewPost, setOpenNewPost] = useState(false);

    const classes = useStyles();
    const newPostTitle = useRef();
    const newPostMessage = useRef();
    // const newPostCipher = useRef();

    const handleCloseNewPost = () => {
        setOpenNewPost(false);
    }

    const handleOpenNewPost = () => {
        setOpenNewPost(true);
    }

    const createPost = () => {
        console.log('Title:', newPostTitle.current.value);
        console.log('Message:', newPostMessage.current.value);
        props.createPost(newPostTitle.current.value, 'Me', newPostMessage.current.value);
        handleCloseNewPost();
    };

    const handleDeletePost = post => () => {
        console.log('Should be deleting post id', post.id);
    }

    const handleSelectPost = post => () => {
        console.log('Should be selecting post id', post.id);
    }

    return (
        <div className={classes.container}>
            <PageHeader />
            <Dialog open={openNewPost} onClose={handleCloseNewPost}>
                <DialogTitle>Create New Post</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Enter a title, a message and you have an option to create a new, random cipher to attach to the post.
                    </DialogContentText>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField autoFocus inputRef={newPostTitle} label="Title" fullWidth />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField inputRef={newPostMessage} label="Message Body" fullWidth multiline rows={4} variant="outlined" />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={createPost} color="primary">Create</Button>
                    <Button onClick={handleCloseNewPost} color="primary">Cancel</Button>
                </DialogActions>
            </Dialog>
            <Grid container spacing={2}>
                <Grid container spacing={2} item xs={12}>
                    {props.posts.length > 0 ?
                        props.posts.map((post, index) =>
                            <Grid key={`forumPost-${index}`} item xs={12}>
                                <ForumPost {...post} onDelete={handleDeletePost(post)} onSelect={handleSelectPost(post)} />
                            </Grid>
                        ) :
                        <Paper>
                            <Typography className={classes.listItem}>No posts yet.</Typography>
                        </Paper>
                    }
                </Grid>
                <Grid item xs={11}></Grid>
                <Grid item xs={1}><Button onClick={handleOpenNewPost}>Create Post</Button></Grid>
            </Grid>
        </div>
    );
}