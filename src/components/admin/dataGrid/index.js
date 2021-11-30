import React, { useEffect, useState } from 'react';
import * as PropTypes from 'prop-types';

import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import TablePagination from '@mui/material/TablePagination';
import TableFooter from '@mui/material/TableFooter';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';

import debounce from 'lodash/debounce';
import capitalize from 'lodash/capitalize';

import makeStyles from '@mui/styles/makeStyles';
import styles from './styles';
const useStyles = makeStyles(styles);

function DataGrid(props) {

    const classes = useStyles();

    const [searchTerm, setSearchTerm] = useState('');
    const [displaySearch, setDisplaySearch] = useState(searchTerm);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(0);

    const debouncedSearch = debounce((search) => { setSearchTerm(search); }, 500);

    const handleChange = value => {
        setDisplaySearch(value);
        debouncedSearch(value);
    };

    const {
        onUpdate,
        count
    } = props;

    const handleClear = () => {
        setDisplaySearch('');
        setSearchTerm('')
    }

    useEffect(() => {
        onUpdate(page, rowsPerPage, searchTerm);
    }, [page, rowsPerPage, searchTerm, onUpdate]);

    return (
        <Card>
            <CardContent>
                <TableContainer>
                    <Box className={classes.searchBox}>
                        <TextField
                            variant='standard'
                            label='Search'
                            onChange={evt => handleChange(evt.target.value)}
                            value={displaySearch}
                            InputProps={{
                                endAdornment: (
                                    <>
                                        {displaySearch !== '' && <IconButton onClick={handleClear} className={classes.clearButton}><ClearIcon /></IconButton>}
                                    </>
                                )
                            }}
                        />
                        <Box className={classes.spacer} />
                        <Tooltip title='Add New Entity'>
                            <Button variant="contained" onClick={props.onAddNew} endIcon={<AddIcon />}>Add New</Button>
                        </Tooltip>
                    </Box>
                    <Table stickyHeader style={{ width: '100%' }}>
                        <TableHead>
                            <TableRow>
                                {props.columns.map((column, index) => 
                                    <TableCell key={`DataGrid-${index}`}>{capitalize(column)}</TableCell>
                                )}
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {props.rows.length > 0 ? props.rows.map((row, index) => 
                                <TableRow key={`grid-${index}`} className={classes.row}>
                                    {props.columns.map((column, index) => 
                                        <TableCell key={`DataGrid-${index}`}>{row[column]}</TableCell>
                                    )}
                                    <TableCell>
                                        {props.rowActions(row._id)}
                                    </TableCell>
                                </TableRow>
                            ) : <TableRow>
                                    <TableCell colSpan={props.columns.length + 1} className={classes.centered}>{props.noData || 'No data found.'}</TableCell>
                                </TableRow>
                            }
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[10, 25, 100, { label: 'All', value: -1 }]}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    count={count}
                                    onPageChange={(_, newPage) => setPage(newPage)}
                                    onRowsPerPageChange={(event) => setRowsPerPage(parseInt(event.target.value, 10))}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>
            </CardContent>
        </Card>
    );
}

DataGrid.propTypes = {
    columns: PropTypes.array,
    totalRows: PropTypes.number,
    onUpdate: PropTypes.func,
    onAddNew: PropTypes.func,
    rowActions: PropTypes.func,
    noData: PropTypes.string,
    rows: PropTypes.array,
    count: PropTypes.number,
}

export default DataGrid;