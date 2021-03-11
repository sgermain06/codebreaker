import React, { useState, useEffect } from "react";
import { document } from "globalthis/implementation";

import { withRouter } from "react-router";
import IconButton from "@material-ui/core/IconButton";
import AddCircleTwoToneIcon from '@material-ui/icons/AddCircleTwoTone';
import ImportantDevicesTwoToneIcon from "@material-ui/icons/ImportantDevicesTwoTone";

import { dataSizeSuffix } from '../../lib/utils';

import "./App.css";


function Station() {
    
    //Upgrade CPU code Block
    const [cpuVersion, setCpuVersion] = useState(1);
    const cpuPrefix = "Pentium";

    useEffect(() => {
        document.title = `Current CPU: ${cpuPrefix} ${cpuVersion}`;
    });

    const upgradeCpu = () => {
        setCpuVersion(cpuVersion + 1);
    };
    const resetCpu = () => {
        setCpuVersion(1);
    };

    //Upgrade Memory code Block
    const [memorySize, setMemory] = useState(2);
    const upgradeMemory = () => {
        const newMem = memorySize * 2;
        console.log('Current memory size:', newMem);
        setMemory(newMem);
    };

    const resetMemory = () => {
        setMemory(2);
    };

    //Upgrade Storage code Block
    const [storageSize, setStorage] = useState(2);
    const upgradeStorage = () => {
        setStorage(storageSize * 2);
    };

    const resetStorage = () => {
        setStorage(2);
    };

    return (
        <div align="center">
            <ImportantDevicesTwoToneIcon className="Logo"/>
            <div className="Upgrade-left" display="in-line">
                CPU: {cpuPrefix} {cpuVersion} <span />
                 
                <IconButton onClick={upgradeCpu}>
                    <AddCircleTwoToneIcon/>
                </IconButton>
                <button onClick={resetCpu}>DEBUG: Reset CPU</button>
            </div>
            <div className="Upgrade-left">
                RAM: {dataSizeSuffix(memorySize, 2)} <span />
                 
                <IconButton onClick={upgradeMemory}>
                    <AddCircleTwoToneIcon/>
                </IconButton>
                <button onClick={resetMemory}>DEBUG: Reset Memory</button>
            </div>
            <div className="Upgrade-left">
                Storage: {dataSizeSuffix(storageSize, 2)} <span />
                <IconButton onClick={upgradeStorage}>
                    <AddCircleTwoToneIcon/>
                </IconButton>
                <button onClick={resetStorage}>DEBUG: Reset Storage</button>
            </div>       
        </div>
    );
}

export default withRouter(Station);
