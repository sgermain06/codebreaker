import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import fromState from '../../state/selectors';
import Commands from '../../state/commands';

import { makeStyles } from '@material-ui/core/styles';

import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import styles from './styles';
import isNil from 'lodash/isNil';
import isNumber from 'lodash/isNumber';

const useStyles = makeStyles(styles);

const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

function LinearProgressWithLabel(props) {
    return (
        <Box display='flex' alignItems='center' style={{ paddingLeft: '5px', paddingRight: '5px' }}>
            <Box width='100%' mr={1}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box minWidth={35}>
                <Typography variant="body2" color="textSecondary" style={{ paddingLeft: '8px' }}>
                    {`${Math.round(props.value,)}%`}
                </Typography>
            </Box>
        </Box>
    );
}

function CodeBreakingAnimation(props) {

    const classes = useStyles();
    let { width, height } = props;
    if (isNil(height)) height = width; 

    const {
        brokenGrid,
        resetBrokenGrid,
        addBrokenGridCell,
        characterGrid,
        setCharacterGrid
    } = props;

    useEffect(() => {
        const randomizeGrid = () => {
            const newArray = [];
            for (let i = 0; i < (width * height); i++) {
                const broken = brokenGrid.includes(i);
                const currentCharactedGrid = isNumber(characterGrid[i]) ? characterGrid[i] : Math.round(Math.random());
                newArray.push(broken ? currentCharactedGrid : characters[Math.floor(Math.random() * characters.length)]);
            }
            setCharacterGrid(newArray);
        };
    
        const resolvePoint = () => {
            let cell = Math.floor(Math.random() * (width * height));
    
            while (brokenGrid.includes(cell)) {
                cell = Math.floor(Math.random() * (width * height));
            }
            addBrokenGridCell(cell);
        };
        
        const gameUpdate = {
            id: 'cipherUpdate', 
            callback: (frames) => {
                randomizeGrid();
                if ((Number(frames.toFixed(3)) * 1000) % 5 === 0) {
                    resolvePoint()
                }
            }
        };

        if (brokenGrid.length >= (width * height)) {
            console.log('Done updating!!');
            props.gameController.removeProcess(gameUpdate);
            resetBrokenGrid();
        }
        else {
            props.gameController.addProcess(gameUpdate);
        }
    }, [resetBrokenGrid, setCharacterGrid, addBrokenGridCell, brokenGrid, width, height, props.gameController, characterGrid]);

    const rows = Array(height).fill(0);

    const randomProcessingClass = () => {
        const randomProcessing = [classes.processing1, classes.processing2, classes.processing3, classes.processing4];
        return randomProcessing[Math.floor(Math.random() * randomProcessing.length)]
    }

    return (
        <div>
            <table>
                <tbody>
                    <tr>
                        <td colSpan={width}>
                            <LinearProgressWithLabel value={(brokenGrid.length / (width * height)) * 100} />
                        </td>
                    </tr>
                {rows.map((_, rowIndex) =>
                    <tr key={'row-' + rowIndex}>
                        {characterGrid.slice(rowIndex * height, (rowIndex * height) + width).map((cell, colIndex) => {
                            const cellClasses = `${classes.cipherGrid} ${brokenGrid.includes(colIndex + (rowIndex * height)) ? classes.solved : randomProcessingClass()}`
                            return (<td className={cellClasses} key={'cell-' + colIndex}>{cell}</td>)
                        })}
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
}

CodeBreakingAnimation.propTypes = {
    gameController: PropTypes.object.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number,
};

const mapStateToProps = (state) => ({
    brokenGrid: fromState.Ciphers.getBrokenGrid()(state),
    characterGrid: fromState.Ciphers.getCharacterGrid()(state),
});

const mapDispatchToProps = (dispatch) => ({
    resetBrokenGrid: () => dispatch(Commands.Ciphers.resetBrokenGrid()),
    addBrokenGridCell: cell => dispatch(Commands.Ciphers.addBrokenGridCell(cell)),
    setCharacterGrid: charactersArary => dispatch(Commands.Ciphers.setCharacterGrid(charactersArary)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CodeBreakingAnimation);