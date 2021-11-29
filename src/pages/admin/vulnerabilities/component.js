import React, { useEffect, useState } from 'react';
import axios from 'axios';

import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import TablePagination from '@mui/material/TablePagination';
import TableFooter from '@mui/material/TableFooter';

import makeStyles from '@mui/styles/makeStyles';
import styles from './styles';

import debounce from 'lodash/debounce';
import isEmpty from 'lodash/isEmpty';
import isNumber from 'lodash/isNumber';
import pickBy from 'lodash/pickBy';
import map from 'lodash/map';

const useStyles = makeStyles(styles);

function Admin(props) {

    const {
        token,
    } = props;

    axios.interceptors.request.use(config => ({
        ...config,
        headers: {
            ...config.headers,
            Authorization: `Bearer ${token}`,
        }
    }));

    const classes = useStyles();

    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(0);
    const [rows, setRows] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const getData = async () => {
            const params = map(pickBy({
                page,
                size: rowsPerPage,
                search: searchTerm
            }, i => isNumber(i) || !isEmpty(i)), (v, k) => `${k}=${v}`).join('&');

            console.log('Params:', params);
            const response = await axios.get(`http://localhost:5000/api/v1/vulnerabilities?${params}`);
            setRows(response.data.records);
        }
        getData();
    }, [page, rowsPerPage, searchTerm]);


    const debouncedSearch = debounce((search) => { setSearchTerm(search); }, 500);

    const handleChange = event => {
        debouncedSearch(event.target.value);
    };

    return (
        <TableContainer>
            <Box className={classes.searchBox}>
                <TextField label='Search' onChange={handleChange} />
            </Box>
            <Table stickyHeader style={{ width: '100%' }}>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Service</TableCell>
                        <TableCell>Version</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.length > 0 ? rows.map((row, index) => 
                        <TableRow key={`vulnerabilitiesIndex-${index}`}>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.description}</TableCell>
                            <TableCell>{row.service}</TableCell>
                            <TableCell>{row.version}</TableCell>
                            <TableCell>Action Here</TableCell>
                        </TableRow>
                    ) : <TableRow>
                            <TableCell colSpan={3} className={classes.centered}>No vulnerabilities found</TableCell>
                        </TableRow>
                    }
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[10, 25, 100, { label: 'All', value: -1 }]}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            count={rows.length}
                            onPageChange={(_, newPage) => setPage(newPage)}
                            onRowsPerPageChange={(event) => setRowsPerPage(parseInt(event.target.value, 10))}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    );
};

export default Admin;