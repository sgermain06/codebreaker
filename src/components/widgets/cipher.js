import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import styles from './styles';

const useStyles = makeStyles(styles);

const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

function CodeBreakingAnimation(props) {

    const classes = useStyles();

    const [ characterGrid, setCharacterGrid ] = useState(Array(20*20));
    const [ brokenGrid ] = useState([]);

    const [processLoaded, setProcessLoaded] = useState(false);

    useEffect(() => {
        const randomizeGrid = () => {
            const newArray = [];
            for (let i = 0; i < (20 * 20); i++) {
                if (!brokenGrid.includes(i)) {
                    const char = characters[Math.floor(Math.random() * characters.length)];
                    newArray.push(char);
                }
                else {
                    newArray.push('1');
                }
            }
            setCharacterGrid(newArray);
        };

        const resolvePoint = () => {
            let cell = Math.floor(Math.random() * (20 * 20));

            while (brokenGrid.includes(cell)) {
                cell = Math.floor(Math.random() * (20 * 20));
            }

            brokenGrid.push(cell);
            console.log('Cell:', cell);
        };

        const gameUpdate = (frames) => {
            if (brokenGrid.length <= 20 * 20) {
                randomizeGrid();
                if ((Number(frames.toFixed(3)) * 100) % 5 === 0) {
                    resolvePoint()
                }
            }
        };

        if (!processLoaded) {
            props.gameController.addProcess(gameUpdate);
            randomizeGrid();
            setProcessLoaded(true);
        }
    }, [processLoaded, props.gameController, characterGrid, brokenGrid]);

    const rows = Array(20).fill(0);

    const randomProcessingClass = () => {
        const randomProcessing = [classes.processing1, classes.processing2, classes.processing3, classes.processing4];
        return randomProcessing[Math.floor(Math.random() * randomProcessing.length)]
    }

    return (
        <div>
            <table className={classes.cipherTable}>
                {rows.map((_, rowIndex) =>
                    <tr key={'row-' + rowIndex}>
                        {characterGrid.slice(rowIndex * 20, (rowIndex * 20) + 20).map((cell, colIndex) => {
                            const cellClasses = `${classes.cipherGrid} ${brokenGrid.includes(colIndex + (rowIndex * 20)) ? classes.solved : randomProcessingClass()}`
                            return (<td className={cellClasses} key={'cell-' + colIndex}>{cell}</td>)
                        })}
                    </tr>
                )}
            </table>
        </div>
    );
}

export default CodeBreakingAnimation;