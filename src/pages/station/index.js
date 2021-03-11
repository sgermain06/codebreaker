import React, { useState, useEffect } from "react";
import { document } from "globalthis/implementation";

import { withRouter } from "react-router";
import IconButton from "@material-ui/core/IconButton";
import AddCircleTwoToneIcon from "@material-ui/icons/AddCircleTwoTone";
import ImportantDevicesTwoToneIcon from "@material-ui/icons/ImportantDevicesTwoTone";
import BackspaceTwoToneIcon from "@material-ui/icons/BackspaceTwoTone";

import { dataSizeSuffix } from '../../lib/utils';

import "./App.css";


function Station() {
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
        <div align="center">
            <ImportantDevicesTwoToneIcon className="Logo" />
            <div className="Upgrade-header" display="in-line">
                CPU : {cpuPrefix}
            </div>
            <div className="Upgrade-feature" display="in-line">
                Power : {cpuPower} <span /> Ghz
                <IconButton onClick={upgradeCPUPower}>
                    <AddCircleTwoToneIcon />
                </IconButton>
                <IconButton onClick={resetCPUPower}>
                    <BackspaceTwoToneIcon />
                </IconButton>
                <br />
                Cores : {cpuCores} <span />
                <IconButton onClick={upgradeCPUCores}>
                    <AddCircleTwoToneIcon />
                </IconButton>
                <IconButton onClick={resetCPUCores}>
                    <BackspaceTwoToneIcon />
                </IconButton>
            </div>
            <div className="Upgrade-header">RAM :</div>
            <div className="Upgrade-feature" display="in-line">
                Size : {dataSizeSuffix(memorySize, 2)} <span />
                <IconButton onClick={upgradeMemory}>
                    <AddCircleTwoToneIcon />
                </IconButton>
                <IconButton onClick={resetMemory}>
                    <BackspaceTwoToneIcon />
                </IconButton>
                <br />
                Type : DDR {memorySpeed}
                <span />
                <IconButton onClick={upgradeMemorySpeed}>
                    <AddCircleTwoToneIcon />
                </IconButton>
                <IconButton onClick={resetMemorySpeed}>
                    <BackspaceTwoToneIcon />
                </IconButton>
            </div>
            <div className="Upgrade-header">Storage :</div>
            <div className="Upgrade-feature" display="in-line">
                Size : {dataSizeSuffix(storageSize, 2)} <span />
                <IconButton onClick={upgradeStorage}>
                    <AddCircleTwoToneIcon />
                </IconButton>
                <IconButton onClick={resetStorage}>
                    <BackspaceTwoToneIcon />
                </IconButton>
                <br />
                Type : HDD
            </div>
        </div>
    );
}

export default withRouter(Station);
