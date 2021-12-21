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

function Vulnerabilities(props) {

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

        const response = await get(`/vulnerabilities?${params}`);
        setRows(response.data.records);
        setCount(response.data.totalRecords);
    }, []);
    
    const rowActions = id => (
        <>
            <Tooltip title='Edit Player'>
                <IconButton onClick={ () => navigateTo(id) }><EditTwoToneIcon /></IconButton>
            </Tooltip>
        </>
    );

    return (
        <DataGrid
            columns={[ 'name', 'description', 'service', 'version' ]}
            onAddNew={ () => navigateTo() }
            noData='No Vulnerabilities Found.'
            rowActions={rowActions}
            rows={rows}
            count={count}
            onUpdate={getData}
        />
    );
};

export default Vulnerabilities;