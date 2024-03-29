import React, { useState, useCallback } from 'react';

import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import PersonOffTwoTone from '@mui/icons-material/PersonOffTwoTone';

import DataGrid from '../../../components/admin/dataGrid';

import isEmpty from 'lodash/isEmpty';
import isNumber from 'lodash/isNumber';
import pickBy from 'lodash/pickBy';
import map from 'lodash/map';

function Players(props) {

    const {
        navigateTo,
        disablePlayer,
        get,
    } = props;

    const [rows, setRows] = useState([]);
    const [count, setCount] = useState(0);

    const getData = useCallback(async (page, size, search) => {
        page++;
        const params = map(pickBy({
            page,
            size,
            search
        }, i => isNumber(i) || !isEmpty(i)), (v, k) => `${k}=${v}`).join('&');

        const response = await get(`/players?${params}`);
        setRows(response.records);
        setCount(response.totalRecords);
    }, []);
    
    const rowActions = id => (
        <>
            <Tooltip title='Edit Player'>
                <IconButton onClick={ () => navigateTo(id) }><EditTwoToneIcon /></IconButton>
            </Tooltip>
            <Tooltip title='Disable Player'>
                <IconButton onClick={ () => disablePlayer(id) }><PersonOffTwoTone /></IconButton>
            </Tooltip>
        </>
    );

    return (
        <DataGrid
            columns={[ 'username', 'name' ]}
            onAddNew={ () => navigateTo() }
            noData='No Players Found.'
            rowActions={rowActions}
            rows={rows}
            count={count}
            onUpdate={getData}
        />
    );
};

export default Players;