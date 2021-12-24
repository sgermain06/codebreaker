import React, { useState, useRef, useEffect } from 'react';
import ReactFlow, {
    ReactFlowProvider,
    addEdge,
    removeElements,
    MiniMap,
    Background,
    Controls,
} from 'react-flow-renderer';

import { v4 } from 'uuid';

import { makeStyles } from '@mui/styles';

import SideBar from '../../../../components/admin/scenarioBuilder/sidebar';
import ButtonEdge from '../../../../components/admin/scenarioBuilder/edge';
import TestNode from '../../../../components/admin/scenarioBuilder/nodes/test';

import Popover from '@mui/material/Popover';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';

import TextField from '@mui/material/TextField';

import SaveTwoTone from '@mui/icons-material/SaveTwoTone';
import Undo from '@mui/icons-material/Undo';

import isEmpty from 'lodash/isEmpty';

import styles from './styles';

import './reactFlowTheme.css';
import { Button } from '@mui/material';

const useStyles = makeStyles(styles);

const getId = () => v4();

function ScenarioBuilder(props) {

    const {
        get,
        post,
        put,
    } = props;

    const scenarioId = props.match.params.id;

    const reactFlowWrapper = useRef(null);

    const classes = useStyles();

    const [elements, setElements] = useState([]);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const [contextMenu, setContextMenu] = useState(null);
    const [nodeName, setNodeName] = useState('');
    const [name, setName] = useState('');
    const [resetDialogOpen, setResetDialogOpen] = useState(false);
    
    const onElementsRemove = elementsToRemove => setElements(els => removeElements(elementsToRemove, els));
    const onConnect = params => setElements(els => addEdge({ ...params, type: 'buttonedge', arrowHeadType: 'arrowclosed' }, els));
    const onLoad = instance => {
        setReactFlowInstance(instance);
    }

    const onDragOver = (event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    };

    const onElementClick = (_, element) => console.log('click', element);

    const onResize = node => ({ x, y, width, height }) => {
        const nodeOptions = {
            position: { x, y },
            style: { width, height },
        }
        setElements(els => els.map(el => (el.id === node.id) ? { ...el, ...nodeOptions } : el));
    };

    const onNodeDragStop = (_, node) => {
        setElements(els => els.map(el => (el.id === node.id) ? { ...node } : el));
    };

    const onDrop = e => {
        e.preventDefault();
        
        const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
        const type = e.dataTransfer.getData('application/reactflow');

        const offsetX = e.dataTransfer.getData('offsetX');
        const offsetY = e.dataTransfer.getData('offsetY');

        const position = reactFlowInstance.project({
            x: e.clientX - reactFlowBounds.left - offsetX,
            y: e.clientY - reactFlowBounds.top - offsetY,
        });

        const id = getId();
        let label = `${type} node`;

        const newNode = {
            id,
            type,
            position,
            data: { label },
        };

        if (type === 'test') {
            newNode.data = {
                label: `${type} node with ID: ${id}`,
                onResize: onResize(newNode),
            };
        }

        setElements(es => es.concat(newNode));
    }

    const edgeTypes = {
        buttonedge: ButtonEdge,
    };

    const nodeTypes = {
        test: TestNode
    };

    const onNodeContextMenu = (event, node) => {
        event.preventDefault();
        const inputs = elements.filter(el => (el.id.includes('reactflow__edge') && el.target === node.id)).map(el => elements.find(node => node.id === el.target));
        const outputs = elements.filter(el => (el.id.includes('reactflow__edge') && el.source === node.id)).map(el => elements.find(node => node.id === el.source));

        console.log({ inputs, outputs });
        setNodeName(node.data.label);
        setContextMenu(
            contextMenu === null
                ? {
                    element: event.target,
                    node,
                }
                : null
        );
    };

    const getScenario = async id => {
        const response = await get('/scenarios/' + id);
        setName(response.name);
        setElements(response.elements);
    }

    useEffect(() => {
        // Should happen only once
        // Load existing scenario
        if (scenarioId !== 'new') {
            getScenario(scenarioId);
        }
    }, []);

    useEffect(() => {
        setElements(els =>
          els.map((el) => {
            if (contextMenu && (el.id === contextMenu.node.id)) {
              // it's important that you create a new object here
              // in order to notify react flow about the change
              el.data = {
                ...el.data,
                label: nodeName,
              };
            }
    
            return el;
          })
        );
      }, [nodeName, setElements]);

    const handleEdit = node => {
        setContextMenu(null);
        console.log('Menu item Edit clicked for node', node);
    }

    const handleChangeLabel = value => {
        setNodeName(value);
    }

    const handleSave = () => {
        try {
            const payload = {name, elements};

            if (isEmpty(payload.name)) {
                throw new Error('Name is required');
            }
    
            if (isEmpty(payload.elements)) {
                throw new Error('Elements are required');
            }
    
            if (scenarioId === 'new') {
                post('/scenarios', payload);
            }
            else {
                put(`/scenarios/${scenarioId}`, payload);
            }
        }
        catch (err) {
            props.enqueueSnackbar(err.message, { variant: 'error' });
        }
    }

    const handleReset = () => {
        setResetDialogOpen(false);
        if (scenarioId !== 'new') {
            getScenario(scenarioId);
        }
        else {
            setName('');
            setElements([]);
        }
    }

    return (
        <div className={classes.root}>
            <div className={classes.title}>
                <Grid container spacing={2}>
                    <Grid item xs>
                        <TextField fullWidth label="Scenario name" value={name} onChange={e => setName(e.target.value)} variant='standard' />
                    </Grid>
                    <Grid item xs='auto'>
                        <Grid container spacing={2}>
                            <Grid item xs><Button variant="contained" color="primary" endIcon={<SaveTwoTone />} onClick={handleSave}>Save</Button></Grid>
                            <Grid item xs><Button variant="outlined" color="error" endIcon={<Undo />} onClick={() => setResetDialogOpen(true)}>Reset</Button></Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
            <div className={classes.content}>
                <ReactFlowProvider>
                    <div className={classes.editor} ref={reactFlowWrapper}>
                        <ReactFlow
                            snapToGrid
                            elements={elements}
                            onConnect={onConnect}
                            onElementsRemove={onElementsRemove}
                            onLoad={onLoad}
                            onDrop={onDrop}
                            edgeTypes={edgeTypes}
                            nodeTypes={nodeTypes}
                            onDragOver={onDragOver}
                            onNodeDragStop={onNodeDragStop}
                            onElementClick={onElementClick}
                            onNodeContextMenu={onNodeContextMenu}
                        >
                            <MiniMap
                                maskColor='#777'
                                nodeColor={(node) => {
                                    switch (node.type) {
                                        case 'input':
                                            return '#0041d0';
                                        case 'output':
                                            return '#ff0072';
                                        case 'test':
                                            return 'green';
                                        default:
                                            return '#eee';
                                    }
                                }}
                            />
                            <Controls />
                            <Background />
                        </ReactFlow>
                        <Popover
                            open={contextMenu !== null}
                            onClose={() => setContextMenu(null)}
                            anchorEl={(contextMenu && contextMenu.element) || null}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                        >
                            <Card>
                                <CardHeader title={contextMenu !== null ? contextMenu.node.id : ''} />
                                <CardContent>
                                    {contextMenu && 
                                        <>
                                            <TextField onChange={e => handleChangeLabel(e.target.value)} value={nodeName} />
                                        </>
                                    }
                                </CardContent>
                            </Card>
                        </Popover>
                    </div>
                    <SideBar className={classes.sidebar} />
                </ReactFlowProvider>
            </div>
            <Dialog
                open={resetDialogOpen}
                onClose={() => setResetDialogOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Are you sure you want to reset this scenario?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        The changes will be reverted to what it was previously saved as. If this is a new scenario, this will reset to a blank scenario.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setResetDialogOpen(false)} color="error">No</Button>
                    <Button onClick={handleReset} color="primary" autoFocus>Yes</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default ScenarioBuilder;