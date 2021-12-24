import React, { useState, useCallback } from 'react';
import axios from 'axios';

import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';

import DataGrid from '../../../components/admin/dataGrid';

import isEmpty from 'lodash/isEmpty';
import isNumber from 'lodash/isNumber';
import pickBy from 'lodash/pickBy';
import map from 'lodash/map';

function Scenarios(props) {

    const {
        navigateTo,
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

        const response = await get(`/scenarios?${params}`);
        setRows(response.records);
        setCount(response.totalRecords);
    }, []);
    
    const rowActions = id => (
        <>
            <Tooltip title='Edit Scenario'>
                <IconButton onClick={ () => navigateTo(id) }><EditTwoToneIcon /></IconButton>
            </Tooltip>
        </>
    );

    return (
        <DataGrid
            columns={[ 'name', 'description', 'domain' ]}
            onAddNew={ () => navigateTo() }
            noData='No Scenario Found.'
            rowActions={rowActions}
            rows={rows}
            count={count}
            onUpdate={getData}
        />
    );
};

export default Scenarios;