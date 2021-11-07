import React from 'react';
import PropTypes from 'prop-types';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import isEmpty from 'lodash/isEmpty';

function CipherProcess(props) {

    const {
        activeCipher,
    } = props;

    return (
        <Card>
            <CardHeader title='Processing Cipher' />
            <CardContent>
                {!isEmpty(activeCipher) ?
                <List>
                    <ListItem>

                    </ListItem>
                </List>
                : 'No Active Cipher'}
            </CardContent>
        </Card>
    );
}

CipherProcess.propTypes = {
    gameController: PropTypes.object.isRequired,
};

export default CipherProcess;