import React, { memo, useState, useEffect } from 'react';
import styled from 'styled-components';

import { Handle, useStoreState } from 'react-flow-renderer';

import { makeStyles } from '@mui/styles';

import styles from './styles';

const useStyles = makeStyles(styles);

const StyledRect = styled.div`

position: relative;
padding: 10px;
display: inline-block;

.contents {
    margin: 10px;
    width: 100%;
    height: 100%;
}

.top, .left, .right, .bottom {
    position: absolute;
    z-index: 40;
}

.top, .bottom {
    cursor: n-resize;
}

.left, .right {
    cursor: e-resize;
}

.top, .bottom {
    left: 8px;
    right: 8px;
    height: 8px;
}

.top:after, .bottom:after, .top:before, .bottom:before {
    content: '';
    position: absolute;
    display: block;
    width: 8px;
    height: 8px;
}

.top:after, .bottom:after {
    right: -8px;
}

.top:before, .bottom:before {
    left: -8px;
}

.top {
    top: 0;
}

.top:after, .bottom:before {
    cursor: ne-resize;
}

.top:before, .bottom:after { 
    cursor: nw-resize;
}

.bottom {
    bottom: 0;
}

.right, .left {
    top: 8px;
    bottom: 8px;
    width: 8px;
}

.right {
    right: 0;
}

.left {
    left: 0;
}
`;

const initialState = {
    down: false,
    startX: null,
    startY: null,
    clientX: null,
    clientY: null,
    startWidth: null,
    startHeight: null,
    horizontalLock: true,
    verticalLock: true,
    directions: [],
}

function TestNode(props) {

    const {
        data
    } = props;

    const classes = useStyles();

    const [mouseDown, setMouseDown] = useState(initialState);
    const [,,zoom] = useStoreState(state => state.transform);
    const { snapGrid: [snapX, snapY] } = useStoreState(state => state);

    useEffect(() => {
        const { down, startX, startY, clientX, clientY, startWidth, startHeight, horizontalLock, verticalLock, directions } = mouseDown;
        const onMove = (e) => {
            if (!down) return; // patch: fix windows press win key during mouseup issue
            e.stopImmediatePropagation();
            const { clientX: moveX, clientY: moveY } = e;
            const tmpX = horizontalLock ? 0 : Math.round((moveX - clientX) / zoom);
            const tmpY = verticalLock ? 0 : Math.round((moveY - clientY) / zoom);
            const deltaX = tmpX - (tmpX % snapX);
            const deltaY = tmpY - (tmpY % snapY);
            const isShiftKey = e.shiftKey;
            let x = startX;
            let y = startY;
            let width = startWidth;
            let height = startHeight;

            if (directions.includes('left')) {
                x = startX + deltaX;
                width = startWidth - deltaX;
                if (isShiftKey) {
                    width -= deltaX;
                }
            }
            else if (directions.includes('right')) {
                width = startWidth + deltaX;
                x = startX;
                if (isShiftKey) {
                    width += deltaX;
                    x -= deltaX;
                }
            }
            if (directions.includes('top')) {
                y = startY + deltaY;
                height = startHeight - deltaY;
                if (isShiftKey) {
                    height -= deltaY;
                }
            }
            else {
                y = startY;
                height = startHeight + deltaY;
                if (isShiftKey) {
                    height += deltaY;
                    y -= deltaY;
                }
            }

            data.onResize({x, y, width, height});
        }
        const onUp = () => {
            document.body.style.cursor = 'auto';
            document.removeEventListener('mousemove', onMove);
            document.removeEventListener('mouseup', onUp);
            if (!down) return;
            setMouseDown(initialState);
        }
        if (down) {
            document.addEventListener('mousemove', onMove)
            document.addEventListener('mouseup', onUp)
        }
    }, [mouseDown]);

    const handleResize = evt => {
        // Don't listen to anything else than left click
        if (evt.button !== 0) return;
        evt.preventDefault();
        evt.stopPropagation();
        const {
            xPos: startX,
            yPos: startY,
        } = props;
        const { clientX, clientY } = evt;
        const {
            offsetWidth: startWidth,
            offsetHeight: startHeight
        } = evt.target.parentElement;

        const direction = evt.target.className;
        const directions = [direction];

        let horizontalLock = true;
        let verticalLock = true;

        if (!['left', 'right'].includes(direction)) {
            if (evt.nativeEvent.offsetX < 8) {
                directions.push('left');
                horizontalLock = false;
            }
            else if (evt.nativeEvent.offsetX > evt.target.offsetWidth - 8) {
                directions.push('right');
                horizontalLock = false;
            }
            verticalLock = false;
        }
        else {
            horizontalLock = false;
            verticalLock = true;
        }

        setMouseDown({
            down: true,
            startX,
            startY,
            clientX,
            clientY,
            startWidth,
            startHeight,
            horizontalLock,
            verticalLock,
            directions,
        });
    }

    return (
        <StyledRect className={classes.root}>
            <div className="top" onMouseDown={handleResize}></div>
            <div className="left" onMouseDown={handleResize}></div>
            <div className="right" onMouseDown={handleResize}></div>
            <div className="bottom" onMouseDown={handleResize}></div>
            <div className="contents">
                {data.label}
            </div>
        </StyledRect>
    );
}

export default memo(({ data, isConnectable, ...props }) => {
    return (
        <>
            <Handle
                type="target"
                position="top"
                id='top'
                onConnect={(params) => console.log('handle onConnect', params)}
                isConnectable={isConnectable}
            />
            <Handle
                type="target"
                position="left"
                id='left'
                onConnect={(params) => console.log('handle onConnect', params)}
                isConnectable={isConnectable}
            />
            <Handle
                type="source"
                position="right"
                id='right'
                onConnect={(params) => console.log('handle onConnect', params)}
                isConnectable={isConnectable}
            />
            <Handle
                type="source"
                position="bottom"
                id='bottom'
                onConnect={(params) => console.log('handle onConnect', params)}
                isConnectable={isConnectable}
            />
            <TestNode data={data} isConnectable={isConnectable} {...props} />
        </>
    );
});