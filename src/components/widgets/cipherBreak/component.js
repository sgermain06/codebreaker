import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import makeStyles from '@mui/styles/makeStyles';

import CancelTwoToneIcon from '@mui/icons-material/CancelTwoTone';

import LinearProgressWithPercent from '../../LinearProgressWithPercent';

import styles from './styles';
import isNil from 'lodash/isNil';
import isNumber from 'lodash/isNumber';
import isEmpty from 'lodash/isEmpty';

const useStyles = makeStyles(styles);

const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

function CodeBreakingAnimation(props) {

    const classes = useStyles();
    let { width, height } = props;
    if (isNil(height)) height = width; 

    const {
        brokenGrid,
        resetGrid,
        addBrokenGridCell,
        characterGrid,
        gridClasses,
        setCharacterGrid,
        setGridClasses,
        completeCipher,
        cancelCipher,
        activeCipher,
    } = props;

    if (!isEmpty(activeCipher)) {
        height = Math.ceil(activeCipher.blocks / width);
    }

    const [frames, setFrames] = React.useState(props.gameController.frames || 0);

    useEffect(() => {

        const randomProcessingClass = () => {
            const randomProcessing = [classes.processing1, classes.processing2, classes.processing3, classes.processing4];
            return randomProcessing[Math.floor(Math.random() * randomProcessing.length)]
        };
    
        // Check if the grid class was initialized. If not, create an array with classes. We're doing this here instead of the
        // reducer's initial state because classes are imported in this component file.
        if (!isEmpty(activeCipher) && isEmpty(gridClasses)) {
            setGridClasses(Array(activeCipher.blocks).fill('').map((_, i) => brokenGrid.includes(i) ? classes.solved : randomProcessingClass()))
        };
    
        const randomizeGrid = () => {
            const newArray = [];
            const newGridClasses = [];
            for (let i = 0; i < (activeCipher.blocks); i++) {
                const broken = brokenGrid.includes(i);
                const currentCharactedGrid = isNumber(characterGrid[i]) ? characterGrid[i] : Math.round(Math.random());
                newArray.push(broken ? currentCharactedGrid : characters[Math.floor(Math.random() * characters.length)]);
                newGridClasses.push(broken ? classes.solved : randomProcessingClass());
            }
            setGridClasses(newGridClasses);
            setCharacterGrid(newArray);
        };
    
        // const resolvePoint = () => {
        //     let cell = Math.floor(Math.random() * (activeCipher.blocks));
    
        //     while (brokenGrid.includes(cell)) {
        //         cell = Math.floor(Math.random() * (activeCipher.blocks));
        //     }
        //     addBrokenGridCell(cell);
        // };
        
        const gameUpdate = {
            id: 'cipherUpdate', 
            callback: (frame) => {
                if (isEmpty(activeCipher)) return;
                if (frame === frames) return;
                setFrames(frame);
                randomizeGrid();
                // if ((Number(frame.toFixed(3)) * 1000) % 5 === 0) {
                //     resolvePoint()
                // }
            }
        };

        if (brokenGrid.length >= activeCipher.blocks) {
            completeCipher(activeCipher);
            props.gameController.removeProcess(gameUpdate);
            resetGrid();
        }
        else {
            props.gameController.addProcess(gameUpdate);
        }
    }, [
        classes,
        frames,
        resetGrid,
        setCharacterGrid,
        gridClasses,
        setGridClasses,
        addBrokenGridCell,
        brokenGrid,
        width,
        height,
        props.gameController,
        characterGrid,
        completeCipher,
        activeCipher,
    ]);

    const rows = Array(height).fill(0);

    const handleCancelCipher = () => {
        console.log('Cancelling...');
        cancelCipher();
        resetGrid();
    }

    return (
        <Card>
            <CardHeader
                title='Breaking Cipher...'
                action={
                    !isEmpty(activeCipher) &&
                    <Tooltip title='Cancel Cipher Breaking'>
                        <IconButton onClick={handleCancelCipher} size="large">
                            <CancelTwoToneIcon />
                        </IconButton>
                    </Tooltip>
                }
            />
            <CardContent>
                {!isEmpty(activeCipher) ?
                <div>
                    <table>
                        <tbody>
                            <tr>
                                <td colSpan={width}>
                                    Algorithm: {activeCipher.type.name}<br />
                                    Blocks: {brokenGrid.length}/{activeCipher.blocks}
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={width}>
                                    <LinearProgressWithPercent value={(brokenGrid.length / activeCipher.blocks) * 100} />
                                </td>
                            </tr>
                        {rows.map((_, rowIndex) =>
                            <tr key={'row-' + rowIndex}>
                                {characterGrid.slice(rowIndex * height, (rowIndex * height) + width).map((cell, colIndex) => {
                                    if (colIndex + (rowIndex * height) > activeCipher.blocks) return <td></td>;
                                    const cellClasses = `${classes.cipherGrid} ${gridClasses[colIndex + (rowIndex * height)]}`
                                    return (<td className={cellClasses} key={'cell-' + colIndex}>{cell}</td>)
                                })}
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
                : 'No Active Cipher'}
            </CardContent>
        </Card>
    );
}

CodeBreakingAnimation.propTypes = {
    gameController: PropTypes.object.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number,
};

export default CodeBreakingAnimation;