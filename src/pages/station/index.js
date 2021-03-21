import React, { useState, useEffect } from "react";
import { document } from "globalthis/implementation";

import { withRouter } from "react-router";

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import { dataSizeSuffix } from '../../lib/utils';

import UpgradableItem from '../../components/upgradableItem';
import UpgradableSection from '../../components/upgradableSection';

import PageHeader from '../../components/pageHeader';

import styles from './styles';

import "./App.css";

const useStyles = makeStyles(styles);

function Station(props) {

    const classes = useStyles();
    
    //Upgrade CPU Power
    const [cpuPower, setCPUPower] = useState(1);
    const cpuPrefix = "Codium";
    useEffect(() => {
        document.title = `Current CPU: ${cpuPrefix} ${cpuPower} GHz ${cpuCores} Cores`;
    });
    const upgradeCPUPower = () => {
        setCPUPower(Number((cpuPower + 0.1).toFixed(2)));
    };
    const resetCPUPower = () => {
        setCPUPower(1);
    };

    //Upgrade CPU Cores
    const [cpuCores, setCPUCores] = useState(1);
    const upgradeCPUCores = () => {
        setCPUCores(cpuCores + 1);
    };
    const resetCPUCores = () => {
        setCPUCores(1);
    };

    //Upgrade Memory Size
    const [memorySize, setMemory] = useState(2);
    const upgradeMemory = () => {
        setMemory(memorySize * 2);
    };
    const resetMemory = () => {
        setMemory(2);
    };

    //Upgrade Memory Speed
    let [memorySpeed, setMemorySpeed] = useState(1);
    const upgradeMemorySpeed = () => {
        if (memorySpeed >= 6) {
            memorySpeed = 6;
        } else {
            setMemorySpeed(memorySpeed + 1);
        }
    };
    const resetMemorySpeed = () => {
        setMemorySpeed(1);
    };

    //Upgrade Video Card Memory 
    const [gpuMemorySize, setGPUMemory] = useState(1024);
    const upgradeGPUMemory = () => {
        setGPUMemory(gpuMemorySize * 2);
    };
    const resetGPUMemory = () => {
        setGPUMemory(1024);
    };

    //Upgrade Video Card Clock Speed    
    const [gpuClock, setGPUClock] = useState(10);
    const upgradeGPUClock = () => {
        setGPUClock(Number((gpuClock + 10).toFixed(2)));
    };
    const resetGPUClock = () => {
        setGPUClock(10);
    };

    //Upgrade Storage Size
    const [storageSize, setStorage] = useState(2);
    const upgradeStorage = () => {
        setStorage(storageSize * 2);
    };

    const resetStorage = () => {
        setStorage(2);
    };

    //Upgrade Monitor Count
    const [monitorCount, setMonitorCount] = useState(1);
    const increaseMonitorCount = () => {
        setMonitorCount(monitorCount + 1);
    }

    const resetMonitorCount = () =>{
        setMonitorCount(1);
    }

    return (
        <div className={classes.container}>
            <PageHeader />
            <Grid container spacing={2}>
                <Grid container spacing={2} item xs={12}>
                    <Grid item xs={4}>
                        <UpgradableSection title="CPU" value={cpuPrefix}>
                            <UpgradableItem title="Power" value={cpuPower} suffix="GHz" upgradeAction={upgradeCPUPower} resetAction={resetCPUPower} />
                            <UpgradableItem title="Cores" value={cpuCores} upgradeAction={upgradeCPUCores} resetAction={resetCPUCores} />
                        </UpgradableSection>
                    </Grid>
                    <Grid item xs={4}>
                        <UpgradableSection title="RAM" value="Obsidium">
                            <UpgradableItem title="Size" value={dataSizeSuffix(memorySize, 1)} upgradeAction={upgradeMemory} resetAction={resetMemory} />
                            <UpgradableItem title="Speed" value={'DDR' + memorySpeed} upgradeAction={upgradeMemorySpeed} resetAction={resetMemorySpeed} />
                        </UpgradableSection>
                    </Grid>
                    <Grid item xs={4}>
                        <UpgradableSection title="Video Card" value="CodeVidia">
                            <UpgradableItem title="Memory" value={dataSizeSuffix(gpuMemorySize, 1)} upgradeAction={upgradeGPUMemory} resetAction={resetGPUMemory} />
                            <UpgradableItem title="Clock" value={gpuClock} suffix="MHz" upgradeAction={upgradeGPUClock} resetAction={resetGPUClock} />
                        </UpgradableSection>
                    </Grid>
                </Grid>
                <Grid container spacing={2} item xs={12}>
                    <Grid item xs={4}>
                        <UpgradableSection title="Storage" value="Eastern Digital">
                            <UpgradableItem title="Size" value={dataSizeSuffix(storageSize, 2)} upgradeAction={upgradeStorage} resetAction={resetStorage} />
                            Type : HDD
                        </UpgradableSection>
                    </Grid>
                    <Grid item xs={4}>
                        <UpgradableSection title="Display" value="X-LG">
                            <UpgradableItem title="Count" value={monitorCount} upgradeAction={increaseMonitorCount} resetAction={resetMonitorCount} />
                            <UpgradableItem title="Resolution" value="" upgradeAction="" resetAction="" />
                        </UpgradableSection>
                    </Grid>
                    <Grid item xs={4}>
                        <UpgradableSection title="Power Supply" value="Texas State">
                            <UpgradableItem title="Wattage" value="" upgradeAction="" resetAction="" />
                            Modular : No
                        </UpgradableSection>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

export default withRouter(Station);
