import React, { useState, useEffect } from 'react';
import { document } from 'globalthis/implementation';

import { withRouter } from 'react-router';

import logo from './logo.svg';
import './App.css';

function Station() {
    const [cpuVersion, setCpuVersion] = useState(1);
    const cpuPrefix = 'Pentium';
  
    useEffect(() => {
      document.title = `Current CPU: ${cpuPrefix} ${cpuVersion}`;
    });
  
    const upgradeCpu = () => {
      setCpuVersion(cpuVersion + 1);
    }
    const resetCpu = () => {
      setCpuVersion(1);
    }

    return (
        <div className="App">
            <img src={logo} className="App-logo" alt="logo" />
            <div>Idunno. Bananas are cool.</div>
            <div>Current CPU: {cpuPrefix} {cpuVersion}</div>
            <button onClick={upgradeCpu}>Upgrade CPU</button>
            <button onClick={resetCpu}>Reset CPU</button>
        </div>
    );
}

export default withRouter(Station);