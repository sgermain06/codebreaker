const FPS = 60;

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
        this.interval = setInterval(this.update, 1000 / FPS);
    }

    stopGameLoop = () => {
        clearInterval(this.interval);
        this.interval = null;
    }

    isRunning = () => {
        return this.interval !== null;
    }

    getFrame = () => {
        return this.currentFrame + this.currentCount;
    }

    getExponent = () => {
        return this.currentExponent;
    }

    toggleGameLoop = () => {
        if (this.isRunning()) {
            this.stopGameLoop();
        }
        else {
            this.startGameLoop();
        }
        return this.isRunning();
    }

    addProcess = (process) => {
        // Make sure you can't duplicate processes
        if (!this.processes.includes(process)) {
            this.processes.push(process);
        }
    }

    removeProcess = (process) => {
        const processIndex = this.processes.indexOf(process);
        // Make sure the process exists before trying to remove it.
        if (processIndex > -1) {
            this.processes = [
                ...this.processes.slice(0, processIndex),
                ...this.processes.slice(processIndex + 1)
            ];
        }
    }

    resetProcesses = () => {
        this.processes = [];
    }

    increaseExponent = (amount = 1) => {
        this.currentExponent += amount;
    }

    decreaseExponent = (amount = 1) => {
        this.currentExponent -= amount;
    }

    setExponent = (amount) => {
        this.currentExponent = amount;
    }

    // Main function
    update = () => {
        this.currentFrame += 0.001;
        if (this.currentFrame > 1) {
            this.currentFrame = 0;
            this.currentCount++;
        }
        
        for (let process of this.processes) {
            process(this.currentFrame, this.currentCount, this.currentExponent);
        }
    }
}