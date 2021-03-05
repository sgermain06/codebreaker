import logo from './logo.svg';
import './App.css';

import React, { useState, useEffect } from 'react';
import { document } from 'globalthis/implementation';

function App() {

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
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <div>Oranges are okay, meh.</div>
        <div>Current CPU: {cpuPrefix} {cpuVersion}</div>
        <button onClick={upgradeCpu}>Upgrade CPU</button>
        <button onClick={resetCpu}>Reset CPU</button>
      </header>
    </div>
  );
}

export default App;
