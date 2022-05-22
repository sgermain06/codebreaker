import React, { useEffect, useState } from "react";
import makeStyles from '@mui/styles/makeStyles';

import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Menu,
    MenuItem,
    List,
    ListItem,
} from "@mui/material";

import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";

import styles from './styles';

import PageHeader from '../../components/pageHeader';

import serversData from '../../components/servers/servers.json';
import Server from '../../components/servers';
import Filter from '../../components/filter';

import uniq from 'lodash/uniq';
import isEmpty from 'lodash/isEmpty';
import omit from 'lodash/omit';

const useStyles = makeStyles(styles);

const manufacturers = uniq(serversData.map(s => s.manufacturer));
// [
//     'Procyon',
//     'Ellipsis Compute Cloud',
//     'Digitech Integrated',
//     'Parallax Solutions',
// ];

function Servers(props) {

    const classes = useStyles();
    const [ openModal, setOpenModal ] = useState(false);
    const [ openNewMenu, setOpenNewMenu ] = useState(false);
    const [ chosenManufacturer, setChosenManufacturer ] = useState(null);
    const [ anchorEl, setAnchorEl ] = useState(null);
    const [ serverFilters, setServerFilters ] = useState({});
    const [ servers, setServers ] = useState([]);

    const handleNew = (manufacturer) => {
        setOpenNewMenu(false);
        setChosenManufacturer(manufacturer);
        setOpenModal(true);
    };

    const handleOpenMenu = evt => {
        setAnchorEl(evt.currentTarget);
        setOpenNewMenu(true);
    };

    const handleUsed = () => {
        setChosenManufacturer('Used Server');
        setOpenModal(true);
    };

    const closeModal = () => {
        setOpenModal(false);
    };

    const handleCloseMenu = () => {
        setOpenNewMenu(false);
        setAnchorEl(null);
    };

    useEffect(() => {
        const filteredServers = serversData
            .filter(s => {
                if (s.manufacturer === chosenManufacturer) {
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
    }, [serverFilters, chosenManufacturer]);

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
        <div className={classes.container}>
            <PageHeader />
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <p>From this page, you can source servers.</p>
                            <Grid container spacing={2}>
                                <Grid item xs={2}>
                                    <Button
                                        variant="contained"
                                        onClick={handleOpenMenu}
                                        endIcon={<KeyboardArrowDown />}
                                    >Purchase New Hardware</Button>
                                </Grid>
                                <Grid item xs={2}><Button variant="contained" onClick={handleUsed}>Purchase Used Hardware</Button></Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <Dialog
                open={openModal}
                onClose={closeModal}
                fullWidth
                maxWidth='xl'
                PaperProps={{ style: {
                    height: 'calc(100% - 64px)'
                }}}
            >
                <DialogTitle>Buying Hardware - {chosenManufacturer}</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={3}>
                            <List>
                                <Filter
                                    title='Form Factor'
                                    options={uniq(serversData.map(s => `${s.formFactor}`)).sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }))}
                                    onSelectionChange={filterByProp('formFactor')} />
                                <Filter
                                    title='Number of CPU(s)'
                                    options={uniq(serversData.map(s => `${s.cpu}`)).sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }))}
                                    onSelectionChange={filterByProp('cpu')} />
                            </List>
                        </Grid>
                        <Grid item xs>
                            <List>
                            {servers.map((server, key) =>
                                <ListItem key={`Server-${key}`}>
                                    <Server server={server} />
                                </ListItem>
                            )}
                            </List>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button variant='contained' onClick={closeModal}>Close</Button>
                </DialogActions>
            </Dialog>
            <Menu
                open={openNewMenu}
                onClose={handleCloseMenu}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
            >
                { manufacturers.map((manufacturer, key) => 
                    <MenuItem
                        key={`Manufacturer-${key}`}
                        onClick={() => handleNew(manufacturer)}
                    >{manufacturer}</MenuItem>
                )}
            </Menu>
        </div>
    );
}

export default Servers;
