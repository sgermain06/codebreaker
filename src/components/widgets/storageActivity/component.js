import React, { useEffect } from 'react';
import PropTypes from "prop-types";

import Plot from 'react-plotly.js';

import useMediaQuery from "@mui/material/useMediaQuery";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';

import { chartTheme } from './styles';

function CpuLoad(props) {
    
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    const {
        height,
        cpuCores,
        cpuLoad,
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
    }, [gameController]);

    return (
        <Card>
            <CardHeader title='Storage' />
            <CardContent>
                <Plot
                    data={[{
                        type: 'indicator',
                        mode: 'gauge+number',
                        value: cpuLoad,
                        number: {
                            suffix: '%',
                            steps: [
                                { range: [0, 60], color: 'rgba(0, 102, 0, 0.2)' },
                                { range: [60, 85], color: 'rgba(102, 102, 0, 0.2)' },
                                { range: [85, 100], color: 'rgba(102, 0, 0, 0.2)' },
                            ],
                        },
                        gauge: {
                            bar: {
                                color: prefersDarkMode ? '#ccc' : '#333',
                            },
                            bgcolor: 'rgba(102, 102, 102, 0.4)',
                            bordercolor: 'rgba(102, 102, 102, 0.8)',
                            borderwidth: 2,
                            axis: {
                                range: [0, 100],
                                showticklabels: false,
                            },
                            steps: [
                                { range: [0, 60], color: 'rgba(0, 102, 0, 0.2)' },
                                { range: [60, 85], color: 'rgba(102, 102, 0, 0.2)' },
                                { range: [85, 100], color: 'rgba(102, 0, 0, 0.2)' },
                            ],
                        },
                    }]}
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