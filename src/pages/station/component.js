import React, { useState, useEffect } from 'react';

import makeStyles from '@mui/styles/makeStyles';
import Grid from "@mui/material/Grid";

import { dataSizeSuffix } from "../../lib/utils";

import UpgradableItem from "../../components/upgradableItem";
import UpgradableSection from "../../components/upgradableSection";

import PageHeader from "../../components/pageHeader";
import CipherWidget from '../../components/widgets/cipherBreak';
import CipherQueueWidget from '../../components/widgets/cipherQueue';

import styles from "./styles";

import "./App.css";

const useStyles = makeStyles(styles);

function Station(props) {
    const classes = useStyles();

    const { cpu } = props;

    useEffect(() => {
        document.title = `Current CPU: Codium ${cpu.speed} GHz ${cpu.cores} Cores`;
    });   

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

    return (
        <div className={classes.container}>
            <PageHeader />
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={6} lg={4}>
                    <UpgradableSection title="CPU" value='Codium'>
                        <UpgradableItem title="Power" value={cpu.speed} suffix="GHz" upgradeAction={props.increaseCpuSpeed} resetAction={props.resetCpuSpeed} />
                        <UpgradableItem title="Cores" value={cpu.cores} upgradeAction={props.increaseCpuCores} resetAction={props.resetCpuCores} />
                    </UpgradableSection>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={4}>
                    <UpgradableSection title="RAM" value="Obsidium">
                        <UpgradableItem
                            title="Size"
                            value={dataSizeSuffix(props.ram.size, props.ram.dataSuffixOffset)}
                            upgradeAction={props.increaseRamSize}
                            resetAction={props.resetRamSize}
                        />
                        <UpgradableItem
                            title="Speed"
                            value={"DDR" + props.ramType}
                            upgradeAction={props.increaseRamType}
                            resetAction={props.resetRamType}
                        />
                    </UpgradableSection>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={4}>
                    <UpgradableSection title="Video Card" value="CodeVidia">
                        <UpgradableItem
                            title="Memory"
                            value={dataSizeSuffix(props.graphicsMemory, 1)}
                            upgradeAction={props.increaseGraphicsMemory}
                            resetAction={props.resetGraphicsMemory}
                        />
                        <UpgradableItem title="Clock" value={props.graphicsClock} suffix="MHz" upgradeAction={props.increaseGraphicsClock} resetAction={props.resetGraphicsClock} />
                    </UpgradableSection>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={4}>
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
                <Grid item xs={12} sm={12} md={6} lg={4}>
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
                <Grid item xs={12} sm={12} md={6} lg={4}>
                    <UpgradableSection title="Power Supply" value="Texas State">
                        <UpgradableItem title="Wattage" value={powerSupply} upgradeAction={upgradePowerSupply} resetAction={resetPowerSupply} />
                        Modular : No
                    </UpgradableSection>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={4}>
                    <CipherWidget gameController={props.gameController} width={20} height={10} />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={4}>
                    <CipherQueueWidget />
                </Grid>
            </Grid>
        </div>
    );
}

export default Station;