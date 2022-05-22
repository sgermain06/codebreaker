import React, { useEffect } from 'react';
import PropTypes from "prop-types";

import Plot from 'react-plotly.js';

import useMediaQuery from "@mui/material/useMediaQuery";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';

import { chartTheme, coreColors, fillColors } from './styles';

import get from 'lodash/get';

function CpuLoad(props) {
    
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    const {
        height,
        addCpuLoad,
        cpuLoad,
        cpuCores,
        gameController
    } = props;

    useEffect(() => {

        const gameUpdate = {
            id: 'cpuLoad', 
            callback: (frames, _, exponent) => {
                if ((Number(frames.toFixed(3)) * 1000) % 5 === 0) {
                    for (let i = 0; i < cpuCores; i++) {
                        const value = Math.round(Math.random() * 50) + 50;
                        addCpuLoad(Math.pow(value, exponent), i);
                    }
                }
            }
        };

        gameController.addProcess(gameUpdate);
    }, [cpuLoad, gameController, addCpuLoad]);

    return (
        <Card>
            <CardHeader title='CPU Cores Load' />
            <CardContent>
                <Plot
                    data={cpuLoad.map((core, coreIndex) => ({
                        ...core,
                        line: {
                            color: get(coreColors(prefersDarkMode), coreIndex, '#ccc'),
                            smoothing: 1.2,
                            shape: 'spline',
                        },
                        name: `Core ${coreIndex + 1}`,
                        fill: 'tozeroy',
                        fillcolor: get(fillColors, coreIndex, 'rgba(102, 102, 102, 0.8)'),
                    }))}
                    {...chartTheme(prefersDarkMode, height)}
                />
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