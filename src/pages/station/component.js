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

    //#region Upgrade Storage Size
    const [storageSize, setStorage] = useState(2);
    const upgradeStorage = () => {
        setStorage(storageSize * 2);
    };

    const resetStorage = () => {
        setStorage(2);
    };
    //#endregion

    //#region Upgrade Storage Type / Speed
    const [storageSpeed, setStorageSpeed] = useState(0);
    const storageSpeeds = ["HDD 4800", "HDD 5400", "HDD 7200", "HDD 10000", "HDD 15000"];

    const upgradeStorageSpeed = () => {
        if (storageSpeed < storageSpeeds.length - 1) {
            setStorageSpeed(storageSpeed + 1);
        }
    };

    const resetStorageSpeed = () => {
        setStorageSpeed(0);
    };

    //#endregion
    //#region Upgrade Codebreaker Subscription
    const [subTier, setSubTier] = useState(0);
    const subTiers = ["Free", "Premium", "Pro", "Pro Plus"];
    const successRateOfBreak = [60, 70, 80, 90];
    const increaseSubTier = () => {
        if (subTier < subTiers.length - 1) {
            setSubTier(subTier + 1);
        }
    };

    const decreaseSubTier = () => {
        if (subTier > 0) {
            setSubTier(subTier - 1);
        }
    };
    //#endregion

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
                                value={dataSizeSuffix(storageSize, 2)}
                                upgradeAction={upgradeStorage}
                                resetAction={resetStorage}
                            />
                            <UpgradableItem
                                title="Type / Speed"
                                value={storageSpeeds[storageSpeed]}
                                upgradeAction={upgradeStorageSpeed}
                                resetAction={resetStorageSpeed}
                            />
                        </UpgradableSection>
                    </Grid>
                    <Grid item xs={4}>
                        <UpgradableSection title="Cipher Suite" value="Codebreaker">
                            <UpgradableItem
                                title="Subscription Tier"
                                value={subTiers[subTier]}
                                upgradeAction={increaseSubTier}
                                resetAction={decreaseSubTier}
                            />
                            <UpgradableItem title="Succes Rate" value={successRateOfBreak[subTier] + "%"} />
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