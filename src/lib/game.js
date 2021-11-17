import get from 'lodash/get';
import isPlainObject from 'lodash/isPlainObject';

const FPS = 60;

function validateProcess(process) {
    if (!isPlainObject(process)) {
        throw new Error('Process needs to be a plain object with an id and a callback.');
    }
    return isPlainObject(process);
}

// Exporting main game controller
export default class GameController {
    constructor() {
        this.interval = null;
        this.currentFrame = Number(0);
        this.currentCount = Number(0);
        this.currentExponent = Number(1);
        this.processes = [];
    }

    startGameLoop = () => {
        this.interval = setInterval(this.update, 5000 / FPS);
    };

    stopGameLoop = () => {
        clearInterval(this.interval);
        this.interval = null;
    };

    isRunning = () => {
        return this.interval !== null;
    };

    getFrame = () => {
        return this.currentFrame + this.currentCount;
    };

    getExponent = () => {
        return this.currentExponent;
    };

    toggleGameLoop = () => {
        if (this.isRunning()) {
            this.stopGameLoop();
        } else {
            this.startGameLoop();
        }
        return this.isRunning();
    };

    addProcess = (process) => {
        // Make sure the process object is valid and you can't duplicate processes
        const processIndex = this.processes.findIndex(i => get(i, 'id') === get(process, 'id'));
        if (validateProcess(process) && processIndex === -1) {
            this.processes.push(process);
        }
        else {
            this.processes[processIndex] = process;
        }
        return processIndex !== -1;
    };

    removeProcess = (process) => {
        const processIndex = this.processes.findIndex(i => get(i, 'id') === get(process, 'id'));
        // Make sure the process exists before trying to remove it.
        if (processIndex > -1) {
            this.processes = [
                ...this.processes.slice(0, processIndex),
                ...this.processes.slice(processIndex + 1)
            ];
        }
    };

    resetProcesses = () => {
        this.processes = [];
    };

    increaseExponent = (amount = 1) => {
        this.currentExponent += amount;
    };

    decreaseExponent = (amount = 1) => {
        this.currentExponent -= amount;
    };

    setExponent = (amount) => {
        this.currentExponent = amount;
    };

    // Main function
    update = () => {
        console.debug('[GameController] - Update');
        this.currentFrame += 0.001;
        if (this.currentFrame > 1) {
            this.currentFrame = 0;
            this.currentCount++;
        }

        for (let process of this.processes) {
            process.callback(this.currentFrame, this.currentCount, this.currentExponent);
        }
    };
}
