import React from 'react';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import ExpandLessTwoTone from '@mui/icons-material/ExpandLessTwoTone';
import ExpandMoreTwoTone from '@mui/icons-material/ExpandMoreTwoTone';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';

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
                        <IconButton onClick={handleAddCipher} size="large">
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