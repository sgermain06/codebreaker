import React, { useState, useEffect } from 'react';

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import { dataSizeSuffix } from "../../lib/utils";

import UpgradableItem from "../../components/upgradableItem";
import UpgradableSection from "../../components/upgradableSection";

import PageHeader from "../../components/pageHeader";

import styles from "./styles";

import "./App.css";

const useStyles = makeStyles(styles);

function Station(props) {
    const classes = useStyles();

    const { cpu } = props;

    useEffect(() => {
        document.title = `Current CPU: Codium ${cpu.speed} GHz ${cpu.cores} Cores`;
    });

    //#region Upgrade Memory Size
    const [memorySize, setMemory] = useState(2);
    const upgradeMemory = () => {
        setMemory(memorySize * 2);
    };
    const resetMemory = () => {
        setMemory(2);
    };
    //#endregion

    //#region Upgrade Memory Speed
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
    //#endregion

    //#region Upgrade Video Card Memory
    const [gpuMemorySize, setGPUMemory] = useState(1024);
    const upgradeGPUMemory = () => {
        setGPUMemory(gpuMemorySize * 2);
    };
    const resetGPUMemory = () => {
        setGPUMemory(1024);
    };
    //#endregion

    //#region Upgrade Video Card Clock Speed
    const [gpuClock, setGPUClock] = useState(10);
    const upgradeGPUClock = () => {
        setGPUClock(Number((gpuClock + 10).toFixed(2)));
    };
    const resetGPUClock = () => {
        setGPUClock(10);
    };
    //#endregion


    // //#region Upgrade Codebreaker Subscription
    // const [subTier, setSubTier] = useState(0);
    // const subTiers = ["Free", "Premium", "Pro", "Pro Plus"];
    // const successRateOfBreak = [60, 70, 80, 90];
    // const increaseSubTier = () => {
    //     if (subTier < subTiers.length - 1) {
    //         setSubTier(subTier + 1);
    //     }
    // };

    // const decreaseSubTier = () => {
    //     if (subTier > 0) {
    //         setSubTier(subTier - 1);
    //     }
    // };
    // //#endregion

    //#region Upgrade Power Supply
    const [powerSupply, setPowerSupply] = useState(180);
    const upgradePowerSupply = () => {
        if(powerSupply < 2000 )
        {
            setPowerSupply(powerSupply + 20);
        }        
    };
    const resetPowerSupply = () => {
        setPowerSupply(180);
    };
    //#endregion

    console.log(props.broadbandType)

    return (
        <div className={classes.container}>
            <PageHeader />
            <Grid container spacing={2}>
                <Grid container spacing={2} item xs={12}>
                    <Grid item xs={4}>
                        <UpgradableSection title="CPU" value='Codium'>
                            <UpgradableItem title="Power" value={cpu.speed} suffix="GHz" upgradeAction={props.increaseCpuSpeed} resetAction={props.resetCpuSpeed} />
                            <UpgradableItem title="Cores" value={cpu.cores} upgradeAction={props.increaseCpuCores} resetAction={props.resetCpuCores} />
                        </UpgradableSection>
                    </Grid>
                    <Grid item xs={4}>
                        <UpgradableSection title="RAM" value="Obsidium">
                            <UpgradableItem
                                title="Size"
                                value={dataSizeSuffix(memorySize, 1)}
                                upgradeAction={upgradeMemory}
                                resetAction={resetMemory}
                            />
                            <UpgradableItem
                                title="Speed"
                                value={"DDR" + memorySpeed}
                                upgradeAction={upgradeMemorySpeed}
                                resetAction={resetMemorySpeed}
                            />
                        </UpgradableSection>
                    </Grid>
                    <Grid item xs={4}>
                        <UpgradableSection title="Video Card" value="CodeVidia">
                            <UpgradableItem
                                title="Memory"
                                value={dataSizeSuffix(gpuMemorySize, 1)}
                                upgradeAction={upgradeGPUMemory}
                                resetAction={resetGPUMemory}
                            />
                            <UpgradableItem title="Clock" value={gpuClock} suffix="MHz" upgradeAction={upgradeGPUClock} resetAction={resetGPUClock} />
                        </UpgradableSection>
                    </Grid>
                </Grid>
                <Grid container spacing={2} item xs={12}>
                    <Grid item xs={4}>
                        <UpgradableSection title="Storage" value="Eastern Digital">
                            <UpgradableItem
                                title="Size"
                                value={dataSizeSuffix(props.storageSize, 2)}
                                upgradeAction={props.increaseStorageSize}
                                resetAction={props.resetStorageSize}
                            />
                            <UpgradableItem
                                title="Type / Speed"
                                value={props.storageType}
                                upgradeAction={props.increaseStorageType}
                                resetAction={props.resetStorageType}
                            />
                        </UpgradableSection>
                    </Grid>
                    <Grid item xs={4}>
                        <UpgradableSection title="Broadband" value={props.broadbandProvider}>
                            <UpgradableItem
                                title="Type"
                                value={props.broadbandType}
                                upgradeAction={props.increaseBroadbandType}
                                resetAction={props.resetBroadbandType}
                            />
                            <UpgradableItem
                                title="Network Speed"
                                suffix="mbps"
                                value={props.broadbandSpeed}
                                upgradeAction={props.increaseBroadbandSpeed}
                                resetAction={props.resetBroadbandSpeed}
                            />
                        </UpgradableSection>
                    </Grid>
                    <Grid item xs={4}>
                        <UpgradableSection title="Power Supply" value="Texas State">
                            <UpgradableItem title="Wattage" value={powerSupply} upgradeAction={upgradePowerSupply} resetAction={resetPowerSupply} />
                            Modular : No
                        </UpgradableSection>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

export default Station;