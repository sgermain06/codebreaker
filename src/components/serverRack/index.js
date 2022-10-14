import React, { useRef, useEffect } from 'react';
import { makeStyles } from '@mui/styles';

import styles from './styles';

const useStyles = makeStyles(styles);

function ServerRack(props) {

    const canvasRef = useRef(null);

    const rackSize = props.size || 40;
    const servers = props.servers || [];

    const classes = useStyles();
    const margin = 10;
    const unitHeight = 24;
    const frameWidth = 12;
    const serverWidth = 250;

    const drawRails = (ctx, pos) => {
        const left = margin;
        const right = canvasRef.current.width - (margin * 2);
        
        ctx.fillStyle = '#222';
        ctx.fillRect(left, pos, 12, unitHeight);
        ctx.fillRect(right, pos, 12, unitHeight);
        
        ctx.fillStyle = '#ccc';
        ctx.beginPath();
        ctx.arc(6 + left, pos + 10, 1, 0, 2 * Math.PI);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(6 + left, pos + 5, 1, 0, 2 * Math.PI);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(6 + left, pos + 15, 1, 0, 2 * Math.PI);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(6 + right, pos + 10, 1, 0, 2 * Math.PI);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(6 + right, pos + 5, 1, 0, 2 * Math.PI);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(6 + right, pos + 15, 1, 0, 2 * Math.PI);
        ctx.fill();
    };

    const drawStorage = (ctx, pos, size, orientation, offsetX, offsetY) => {

        const storageWidth = (size === 2.5) ? (orientation === 'horizontal' ? 44 : 10.4166667) : (orientation === 'horizontal' ? 62.5 : 12);
        const storageHeight = (size === 2.5) ? (orientation === 'horizontal' ? 6 : 44) : (orientation === 'horizontal' ? 12 : 62.5);
        const marginX = 0;
        const marginY = 2;

        const currentYPos = Math.floor((pos * storageWidth) / serverWidth);
        const currentXPos = Math.floor(((pos * storageWidth) % serverWidth) / storageWidth);

        console.log(`Rendering ${orientation} ${size} storage #${pos} at ${currentXPos}x${currentYPos}`);
        ctx.strokeStyle = 'red';
        ctx.strokeRect(offsetX + currentXPos * storageWidth, marginY + (offsetY + currentYPos * storageHeight), storageWidth, storageHeight);

    };

    const drawServer = (ctx, server, nextPos = 0) => {
        const serverHeight = (server.formFactor * unitHeight) - 1;
        const serverWidth = ctx.canvas.width - (margin * 2);

        ctx.fillStyle = '#000';
        ctx.fillRect(margin, margin + (nextPos * unitHeight), serverWidth, serverHeight);

        for (let i = 0; i < server.storage.amount; i++) {
            drawStorage(ctx, i, server.storage.size, server.storage.orientation, margin + frameWidth, margin + (nextPos * unitHeight));
        }

        return nextPos + server.formFactor;
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < rackSize; i++) {
            const yPos = (i * unitHeight) + margin;
            drawRails(ctx, yPos);
        }

        let nextPos = 0;
        for (const server of servers) {
            console.log('Current position:', nextPos);
            nextPos = drawServer(ctx, server, nextPos);
        }
    }, [servers]);

    return (
        <canvas className={classes.rack} height={(rackSize * unitHeight) + (margin * 2)} width={(serverWidth + (margin * 2)) + (frameWidth * 2)} ref={canvasRef} />
    );
}

export default ServerRack;