import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { withRouter } from 'react-router-dom';

import makeStyles from '@mui/styles/makeStyles';
import Typography from "@mui/material/Typography";
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import PageHeader from '../../components/pageHeader';

import CipherWidget from '../../components/widgets/cipherBreak';
import CpuLoadWidget from '../../components/widgets/cpuLoad';

import styles from './styles';

import '../station/App.css';

const useStyles = makeStyles(styles);

function NeuralNet(props) {

    const classes = useStyles();

    const {
        gameController
    } = props;

    const [frames, setFrames] = useState(0);
    const [counts, setCounts] = useState(0);
    const [exponent, setExponent] = useState(0);
    const [processLoaded, setProcessLoaded] = useState(false);

    useEffect(() => {
        const gameUpdate = {
            id: 'neuralNet', 
            callback: (frames, counts, exponent) => {
                setFrames(Number(frames.toFixed(3)));
                setCounts(counts);
                setExponent(exponent);
            }
        };

        if (!processLoaded) {
            gameController.addProcess(gameUpdate);
            setProcessLoaded(true);
        }
        return () => {
            if (processLoaded) {
                gameController.removeProcess(gameUpdate);
                setProcessLoaded(false);
            }
        }
    }, [processLoaded, gameController]);


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
                    <CpuLoadWidget gameController={gameController} width={1200} height={300} />
                </Grid>
                <Grid item xs = {4}>
                    <CipherWidget gameController={gameController} width={20} height={10} />
                </Grid>
            </Grid>
        </div>
    );
}

NeuralNet.propTypes = {
    gameController: PropTypes.object,
};

export default withRouter(NeuralNet);
