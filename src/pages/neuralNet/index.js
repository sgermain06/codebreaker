import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

import { Line } from "@reactchartjs/react-chart.js";
import "chartjs-plugin-streaming";

import { makeStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import styles from './styles';

const useStyles = makeStyles(styles);

function NeuralNet(props) {

    const classes = useStyles();
    const chartRef = useRef(null);

    const [frames, setFrames] = useState(0);
    const [counts, setCounts] = useState(0);
    const [exponent, setExponent] = useState(0);
    const [processLoaded, setProcessLoaded] = useState(false);

    const [dataPoints, setDataPoints] = useState(Array(20).fill(0));

    const data = {
        labels: Array(20).fill(0).map((_, k) => k + 1),
        datasets: [
            {
                label: "CPU Load",
                data: dataPoints,
                fill: false,
                lineTension: 0,
                backgroundColor: "rgb(255, 99, 232)",
                borderColor: "rgba(255, 99, 132, 0.2)",
            },
        ],
    };

    const options = {
        maintainAspectRatio: false,
        scales: {
            xAxes: [
                {
                    type: 'realtime',
                    realtime: {
                        refresh: 6000
                    }
                }
            ],
            yAxes: [
                {
                    scaleLabel: {
                        display: false,
                    }
                },
            ],
        },
    };



    useEffect(() => {
        const handleDataPoints = () => {
            const newValue = { x: Date.now(), y: Math.round(Math.random() * 100) };
            const dp = dataPoints;
            dp.push(newValue);
            if (dp.length > 22) {
                dp.shift();
            }
            setDataPoints(dp);
        };

        const gameUpdate = (frames, counts, exponent) => {
            setFrames(Number(frames.toFixed(3)));
            setCounts(counts);
            setExponent(exponent);
            if ((Number(frames.toFixed(3)) * 100) % 5 === 0) {
                console.log("Tick!");
                handleDataPoints();
                console.log(chartRef);
                // chartRef.current.update();
            }
        };

        if (!processLoaded) {
            props.gameController.addProcess(gameUpdate);
            setProcessLoaded(true);
        }
    }, [processLoaded, dataPoints, props.gameController]);

    return (
        <div className={classes.container}>
            <h2>Neural Net</h2>
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
                            <Line ref={chartRef} data={data} options={options} width='800' height='400' />
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

export default NeuralNet;
