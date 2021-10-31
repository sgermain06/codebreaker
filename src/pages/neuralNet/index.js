import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { withRouter } from 'react-router-dom';

import { VictoryAxis, VictoryChart, VictoryArea } from 'victory';

import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Typography from "@material-ui/core/Typography";
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';

import PageHeader from '../../components/pageHeader';

import CipherWidget from '../../components/widgets/cipher';

import last from 'lodash/last';

import styles from './styles';

import '../station/App.css';

const useStyles = makeStyles(styles);

const chartTheme = darkMode => ({
    axis: {
        style: {
            axis: {
                fill: 'transparent',
                stroke: 'rgba(102, 102, 102, 0.5)',
                strokeWidth: 1,
                strokeLineCap: 'round',
                strokeLinejoin: 'round',
            },
            tickLabels: {
                fontSize: 12,
                padding: 8,
                fill: darkMode ? '#ccc' : '#333'
            },
            grid: {
                fill: 'none',
                stroke: 'rgba(102, 102, 102, 0.5)',
                strokeWidth: 1,
                strokeLineCap: 'round',
                strokeLinejoin: 'round',
            }
        }
    },
    data: {
        fill: 'rgba(102, 102, 102, 0.5)',
        stroke: darkMode ? '#ccc' : '#333',
        strokeWidth: 2,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
    }
});

function NeuralNet(props) {

    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

    const classes = useStyles();

    const [frames, setFrames] = useState(0);
    const [counts, setCounts] = useState(0);
    const [exponent, setExponent] = useState(0);
    const [processLoaded, setProcessLoaded] = useState(false);

    const [dataPoints, setDataPoints] = useState(Array(200).fill(0).map((_, k) => ({x: k, y: Math.floor(Math.random() * 50) + 50})));
    const length = dataPoints.length;

    useEffect(() => {
        const handleDataPoints = exponent => {
            const xVal = last(dataPoints).x + 1;
            const newValue = { x: xVal, y: Math.pow(Math.round(Math.random() * 50) + 50, exponent) };
            const dp = dataPoints;
            dp.push(newValue);
            if (dp.length > length) {
                dp.shift();
            }
            setDataPoints(dp);
        };

        const gameUpdate = {
            id: 'neuralNet', 
            callback: (frames, counts, exponent) => {
                setFrames(Number(frames.toFixed(3)));
                setCounts(counts);
                setExponent(exponent);
                if ((Number(frames.toFixed(3)) * 1000) % 5 === 0) {
                    handleDataPoints(exponent);
                }
            }
        };

        if (!processLoaded) {
            props.gameController.addProcess(gameUpdate);
            setProcessLoaded(true);
        }
    }, [processLoaded, dataPoints, props.gameController, length]);

    return (
        <div className={classes.container}>
            <PageHeader />
            <Grid container spacing={3}>
                <Grid item xs={4}>
                    <Card>
                        <CardContent>
                            <Typography>
                                Frames: {frames}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={4}>
                    <Card>
                        <CardContent>
                            <Typography>
                                Counts: {counts}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={4}>
                    <Card>
                        <CardContent>
                            <Typography>
                                Exponent: {exponent}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <VictoryChart
                                width={1200}
                                height={300}
                                theme={chartTheme(prefersDarkMode)}
                            >
                                <VictoryAxis style={{ tickLabels: { fill: 'transparent' }}} />
                                <VictoryAxis dependentAxis />
                                <VictoryArea
                                    style={chartTheme(prefersDarkMode)}
                                    data={dataPoints}
                                />
                            </VictoryChart>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs = {4}>
                    <Card>
                        <CardHeader
                            title='Breaking Cipher...'
                        />
                        <CardContent>
                            <CipherWidget gameController={props.gameController} width={20} height={10} />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
}

NeuralNet.propTypes = {
    gameController: PropTypes.object,
};

export default withRouter(NeuralNet);
