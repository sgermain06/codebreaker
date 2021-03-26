import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';

import styles from './styles';
import isNil from 'lodash/isNil';

const useStyles = makeStyles(styles);

const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

function CodeBreakingAnimation(props) {

    const classes = useStyles();
    let { width, height } = props;
    if (isNil(height)) height = width; 

    const [ characterGrid, setCharacterGrid ] = useState(Array(width*height));
    const [ brokenGrid ] = useState([]);

    const [processLoaded, setProcessLoaded] = useState(false);

    useEffect(() => {
        const randomizeGrid = () => {
            const newArray = [];
            for (let i = 0; i < (width * height); i++) {
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
            let cell = Math.floor(Math.random() * (width * height));

            while (brokenGrid.includes(cell)) {
                cell = Math.floor(Math.random() * (width * height));
            }

            brokenGrid.push(cell);
            console.log('Cell:', cell);
        };

        const gameUpdate = (frames) => {
            if (brokenGrid.length <= (width * height)) {
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
    }, [processLoaded, props.gameController, characterGrid, brokenGrid, width, height]);

    const rows = Array(height).fill(0);

    const randomProcessingClass = () => {
        const randomProcessing = [classes.processing1, classes.processing2, classes.processing3, classes.processing4];
        return randomProcessing[Math.floor(Math.random() * randomProcessing.length)]
    }

    return (
        <div>
            <table className={classes.cipherTable}>
                {rows.map((_, rowIndex) =>
                    <tr key={'row-' + rowIndex}>
                        {characterGrid.slice(rowIndex * height, (rowIndex * height) + width).map((cell, colIndex) => {
                            const cellClasses = `${classes.cipherGrid} ${brokenGrid.includes(colIndex + (rowIndex * height)) ? classes.solved : randomProcessingClass()}`
                            return (<td className={cellClasses} key={'cell-' + colIndex}>{cell}</td>)
                        })}
                    </tr>
                )}
            </table>
        </div>
    );
}

CodeBreakingAnimation.propTypes = {
    gameController: PropTypes.func.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number,
};

export default CodeBreakingAnimation;