import React, { useState, useEffect } from 'react';

import ServerComponent from '../serverComponent';
import Filter from '../filter';

import {
    Grid,
    List,
    ListItem,
} from '@mui/material';

import uniq from 'lodash/uniq';
import isEmpty from 'lodash/isEmpty';
import omit from 'lodash/omit';

function ServerStore(props) {

    const { data, manufacturer } = props;

    const [ serverFilters, setServerFilters ] = useState({});
    const [ servers, setServers ] = useState([]);

    useEffect(() => {
        const filteredServers = data
            .filter(s => {
                if (s.manufacturer === manufacturer) {
                    for (const key in s) {
                        if (Object.keys(serverFilters).includes(key)) {
                            if (!serverFilters[key].includes(s[key].toString())) {
                                return false;
                            }
                        }
                    }
                    return true;
                }
                return false;
            });
        
        setServers(filteredServers);
    }, [serverFilters, manufacturer]);

    const filterByProp = (prop) => (values) => {
        let currentFilters = serverFilters;
        if (!isEmpty(values)) {
            currentFilters = {
                ...currentFilters,
                [prop]: values
            };
        }
        else {
            currentFilters = omit(currentFilters, [prop]);
        }
        setServerFilters(currentFilters);
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={3}>
                <List>
                    <Filter
                        title='Form Factor'
                        options={uniq(data.map(s => `${s.formFactor}`)).sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }))}
                        onSelectionChange={filterByProp('formFactor')} />
                    <Filter
                        title='Number of CPU(s)'
                        options={uniq(data.map(s => `${s.cpu}`)).sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }))}
                        onSelectionChange={filterByProp('cpu')} />
                </List>
            </Grid>
            <Grid item xs>
                <List>
                {servers.map((server, key) =>
                    <ListItem key={`Server-${key}`}>
                        <ServerComponent server={server} onAddToCart={props.onAddToCart} />
                    </ListItem>
                )}
                </List>
            </Grid>
        </Grid>
    );
}

export default ServerStore;