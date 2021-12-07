import React from 'react';
import clsx from 'clsx';

import { makeStyles } from '@mui/styles';

import styles from './styles';

const useStyles = makeStyles(styles);

const onDragStart = (evt, nodeType) => {
    evt.dataTransfer.setData("application/reactflow", nodeType);
    evt.dataTransfer.setData('offsetX', evt.nativeEvent.offsetX);
    evt.dataTransfer.setData('offsetY', evt.nativeEvent.offsetY);
    evt.dataTransfer.effectAllowed = "move";
};

function SideBar() {

    const classes = useStyles();

    return (
        <aside className={classes.root}>
            <div className="react-flow__node-input" onDragStart={e => onDragStart(e, 'input')} draggable>Input Node</div>
            <div className="react-flow__node-default" onDragStart={e => onDragStart(e, 'default')} draggable>Default Node</div>
            <div className="react-flow__node-output" onDragStart={e => onDragStart(e, 'output')} draggable>Output Node</div>
            <div className={clsx('react-flow__node-default', classes.testNode)} onDragStart={e => onDragStart(e, 'test')} draggable>Test Node</div>
        </aside>
    );
}

export default SideBar;