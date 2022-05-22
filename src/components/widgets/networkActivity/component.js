import React from 'react';
import PropTypes from "prop-types";

import Plot from 'react-plotly.js';

import useMediaQuery from "@mui/material/useMediaQuery";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';

import { chartTheme, fillColor, coreColor } from './styles';

function NetworkActivity(props) {
    
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    const {
        height,
        broadbandSpeed,
        networkActivity,
        gameController,
    } = props;

    return (
        <Card>
            <CardHeader title={`Network Activity - ${broadbandSpeed}`} />
            <CardContent>
                <Plot
                    data={[{
                        y: networkActivity,
                        line: {
                            color: coreColor(prefersDarkMode),
                            smoothing: 1.2,
                            shape: 'spline',
                        },
                        fill: 'tozeroy',
                        fillcolor: fillColor,
                    }]}
                    {...chartTheme(prefersDarkMode, height)}
                />
            </CardContent>
        </Card>
    );
}

NetworkActivity.propTypes = {
    height: PropTypes.number,
    gameController: PropTypes.object,
};

export default NetworkActivity;