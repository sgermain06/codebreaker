import React, { useState, useEffect } from "react";
import { document } from "globalthis/implementation";

import { withRouter } from "react-router";

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import ImportantDevicesTwoToneIcon from "@material-ui/icons/ImportantDevicesTwoTone";

import { dataSizeSuffix } from '../../lib/utils';

import UpgradableItem from '../../components/upgradableItem';
import UpgradableSection from '../../components/upgradableSection';

import styles from './styles';

import "./App.css";

const useStyles = makeStyles(styles);

function Station() {

    const classes = useStyles();
    
    //Upgrade CPU  Power
    const [cpuPower, setCPUPower] = useState(1);
    const cpuPrefix = "Codium";
    useEffect(() => {
        document.title = `Current CPU: ${cpuPrefix} ${cpuPower}`;
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

    //Upgrade Memory code Block
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

    //Upgrade Storage Size
    const [storageSize, setStorage] = useState(2);
    const upgradeStorage = () => {
        setStorage(storageSize * 2);
    };

    const resetStorage = () => {
        setStorage(2);
    };

    return (
        <div className={classes.container}>
            <ImportantDevicesTwoToneIcon className="Logo" />

            <Grid container spacing={2}>
                <Grid container spacing={2} item xs={12}>
                    <Grid item xs={3}>
                        <UpgradableSection title="CPU" value={cpuPrefix}>
                            <UpgradableItem title="Power" value={cpuPower} suffix="GHz" upgradeAction={upgradeCPUPower} resetAction={resetCPUPower} />
                            <UpgradableItem title="Cores" value={cpuCores} upgradeAction={upgradeCPUCores} resetAction={resetCPUCores} />
                        </UpgradableSection>
                    </Grid>
                    <Grid item xs={3}>
                        <UpgradableSection title="RAM">
                            <UpgradableItem title="Size" value={dataSizeSuffix(memorySize, 1)} upgradeAction={upgradeMemory} resetAction={resetMemory} />
                            <UpgradableItem title="Type" value={'DDR' + memorySpeed} upgradeAction={upgradeMemorySpeed} resetAction={resetMemorySpeed} />
                        </UpgradableSection>
                    </Grid>
                </Grid>
                <Grid container spacing={2} item xs={12}>
                    <Grid item xs={3}>
                        <UpgradableSection title="Storage">
                            <UpgradableItem title="Size" value={dataSizeSuffix(storageSize, 2)} upgradeAction={upgradeStorage} resetAction={resetStorage} />
                            Type : HDD
                        </UpgradableSection>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

export default withRouter(Station);
