import React, { useEffect } from 'react';
import PropTypes from "prop-types";

import { VictoryAxis, VictoryChart, VictoryArea } from 'victory';

import useMediaQuery from "@material-ui/core/useMediaQuery";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';

import last from 'lodash/last';

import { chartTheme } from './styles';

function CpuLoad(props) {
    
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    const {
        width,
        height,
        addCpuLoad,
        cpuLoad,
        gameController
    } = props;

    useEffect(() => {

        const gameUpdate = {
            id: 'cpuLoad', 
            callback: (frames, _, exponent) => {
                if ((Number(frames.toFixed(3)) * 1000) % 5 === 0) {
                    const xVal = last(cpuLoad).x + 1;
                    addCpuLoad({ x: xVal, y: Math.pow(Math.round(Math.random() * 50) + 50, exponent) });
                }
            }
        };

        gameController.addProcess(gameUpdate);
    }, [cpuLoad, gameController, addCpuLoad]);

    return (
        <Card>
            <CardHeader title='CPU Load' />
            <CardContent>
                <VictoryChart
                    width={width}
                    height={height}
                    theme={chartTheme(prefersDarkMode)}
                >
                    <VictoryAxis style={{ tickLabels: { fill: 'transparent' }}} />
                    <VictoryAxis dependentAxis />
                    <VictoryArea
                        style={chartTheme(prefersDarkMode)}
                        data={cpuLoad}
                    />
                </VictoryChart>
            </CardContent>
        </Card>
    );
}

CpuLoad.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    gameController: PropTypes.object,
};

export default CpuLoad;