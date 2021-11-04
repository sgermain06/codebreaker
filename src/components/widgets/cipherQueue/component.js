import React from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

import ExpandLessTwoTone from '@material-ui/icons/ExpandLessTwoTone';
import ExpandMoreTwoTone from '@material-ui/icons/ExpandMoreTwoTone';
import AddCircleTwoToneIcon from '@material-ui/icons/AddCircleTwoTone';

import CipherListItem from '../../cipherListItems';

function CipherQueue(props) {

    const {
        active,
        completed,
        canceled,
        addCipher,
        completeCipher,
    } = props;

    const [completedOpen, setCompletedOpen] = React.useState(false);
    const [canceledOpen, setCanceledOpen] = React.useState(false);

    const handleCompletedOpen = () => setCompletedOpen(!completedOpen);
    const handleCanceledOpen = () => setCanceledOpen(!canceledOpen);

    const handleAddCipher = () => {
        addCipher();
    }

    const handleCompleteCipher = cipher => {
        completeCipher(cipher);
    }

    return (
        <Card>
            <CardHeader
                title='Cipher Queue'
                action={
                    <Tooltip title='Add Cipher'>
                        <IconButton onClick={handleAddCipher}>
                            <AddCircleTwoToneIcon />
                        </IconButton>
                    </Tooltip>
                }
            />
            <CardContent>
                <List component='div'>
                    <CipherListItem ciphers={active} action={handleCompleteCipher} empty='No Active Cipher' />
                    <ListItem button onClick={handleCompletedOpen}>
                        <ListItemText primary='Completed' />
                        {completedOpen ? <ExpandLessTwoTone /> : <ExpandMoreTwoTone />}
                    </ListItem>
                    <Collapse in={completedOpen} timeout='auto' unmountOnExit>
                        <List component='div' disablePadding>
                            <CipherListItem ciphers={completed} nested empty='No Completed Cipher' />
                        </List>
                    </Collapse>
                    <ListItem button onClick={handleCanceledOpen}>
                        <ListItemText primary='Canceled' />
                        {canceledOpen ? <ExpandLessTwoTone /> : <ExpandMoreTwoTone />}
                    </ListItem>
                    <Collapse in={canceledOpen} timeout='auto' unmountOnExit>
                        <List component='div' disablePadding>
                            <CipherListItem ciphers={canceled} nested empty='No Canceled Cipher' />
                        </List>
                    </Collapse>
                </List>
            </CardContent>
        </Card>
    );
}

export default CipherQueue;