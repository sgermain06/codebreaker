const LightBlue = require('@mui/material/colors/lightBlue').default;
const LightGreen = require('@mui/material/colors/lightGreen').default;
const Amber = require('@mui/material/colors/amber').default;
const Purple = require('@mui/material/colors/purple').default;
const Grey = require('@mui/material/colors/grey').default;
const Brown = require('@mui/material/colors/brown').default;

const Ping = require('./terminalApps/ping');
const HttpRequest = require('./terminalApps/http');

const isArray = require('lodash/isArray');
const isPlainObject = require('lodash/isPlainObject');
const isString = require('lodash/isString');
const isBoolean = require('lodash/isBoolean');
const isNull = require('lodash/isNull');
const isUndefined = require('lodash/isUndefined');

module.exports = class Terminal {

    constructor(options) {
        this.options = options;
        this._history = [];
        this.commandId = 0;
    }

    addHistory(commandLine, commandId) {
        if (!this.history[0] || this.history[0].command !== commandLine) {
            this._history = [{command: commandLine, id: commandId}, ...this._history.slice(0, this.options.historySize - 1)];
        }
    }

    get history() {
        return this._history;
    }

    attachTerminal({ stdin, stdout, stderr }) {
        this.stdin = stdin;
        this.stdout = stdout;
        this.stderr = stderr;
    }

    async readSecure(prompt) {
        return this.readLine(prompt, '*');
    }

    async readLine(prompt, characterOverride = null) {
        return await new Promise((resolve, reject) => {
            let buffer = '';
            this.stdout(prompt, { caretAtEnd: true });
            this.stdin(char => {
                switch (char) {
                    case '^C':
                        this.stdin(null);
                        reject(`${prompt}${buffer}^C`);
                        break;
                    case '\n': 
                        this.stdin(null);
                        resolve(buffer);
                        break;
                    default:
                        // Set the buffer to whatever came in the input
                        buffer = char;
                        const output = characterOverride ? characterOverride.repeat(char.length) : char;
                        this.stdout(`${prompt}${output}`, { updateMode: true });
                        break;
                }
            });
        });
    }

    async readChar(prompt, limitedCharacters = [], defaultCharacter = '', caseSensitive = true) {
        return await new Promise((resolve, reject) => {
            const characterSetPrompt = limitedCharacters.length ? `(${limitedCharacters.join('/')}) ` : '';
            const defaultPrompt = defaultCharacter !== '' ? ` [${defaultCharacter}] ` : '';
            const finalPrompt = `${prompt}${characterSetPrompt}${defaultPrompt}`;
            this.stdout(finalPrompt, { caretAtEnd: true });
            this.stdin(char => {
                if (char === '^C') {
                    this.stdin(null);
                    reject(`${finalPrompt}^C`);
                }
                if (limitedCharacters.length) {
                    if (char === '\n' && defaultCharacter !== '') {
                        this.stdin(null);
                        resolve(defaultCharacter);
                    }
                    if (limitedCharacters.map(c => caseSensitive ? c : c.toUpperCase()).includes(caseSensitive ? char : char.toUpperCase())) {
                        this.stdin(null);
                        resolve(char);
                    }
                }
                else {
                    if (char === '\n' && defaultCharacter !== '') {
                        this.stdin(null);
                        resolve(defaultCharacter);
                    }
                    else {
                        this.stdin(null);
                        resolve(char);
                    }
                }
            }, { characterMode: true });
        });
    }

    log(message, depth = 2, indent = 0) {
        const margin = (extras = 0) => '\u00a0'.repeat(indent + extras);
        if (indent === 0) this.stdout('');
        if (isArray(message)) {
            if (indent / 2 > depth) {
                this.stdout('[Array...]', { characterMode: true, color: Purple['A400'] });
            }
            else {
                this.stdout('[', { characterMode: true });
                message.forEach((m, i) => {
                    this.stdout(margin(2));
                    this.log(m, depth, indent + 2)
                    if (i < message.length - 1) {
                        this.stdout(',', { characterMode: true });
                    }
                });
                this.stdout(`${margin()}]`);
            }
        }
        else if (isPlainObject(message)) {
            if (indent / 2 > depth) {
                this.stdout('[Object...]', { characterMode: true, color: Purple['A400'] });
            }
            else {
                this.stdout('{', { characterMode: true });
                for (const key in message) {
                    this.stdout(`${margin(2)}${key}: `, { color: LightGreen['400'] });
                    this.log(message[key], depth, indent + 2);
                    if (Object.keys(message).indexOf(key) < Object.keys(message).length - 1) {
                        this.stdout(',', { characterMode: true });
                    }
                }
                this.stdout(`${margin()}}`);
            }
        }
        else {
            if (isString(message)) {
                this.stdout('"', { characterMode: true });
                const lines = message.split('\n');
                const firstLine = lines.shift();
                this.stdout(firstLine, { characterMode: true });
                lines.forEach(line => { this.stdout(`${margin(2)}${line}`)});
                this.stdout('"', { characterMode: true });
            }
            else {
                if (isBoolean(message)) {
                    this.stdout(message, { characterMode: true, color: LightBlue['500'] });
                }
                else if (isUndefined(message)) {
                    this.stdout('undefined', { characterMode: true, color: Grey['600'] });
                }
                else if (isNull(message)) {
                    this.stdout('null', { characterMode: true, color: Brown['A400'] });
                }
                else {
                    this.stdout(message, { characterMode: true, color: Amber['900'] });
                }
            }
        }
    }

    async command(commandLine) {

        const commandToRun = commandLine => {
            const command = commandLine.split(' ')[0].trim();
            if (command.startsWith('!')) {
                const commandId = command.substring(1);
                const historyCommand = this.history.find(h => Number(h.id) === Number(commandId));
                if (historyCommand) {
                    return historyCommand.command;
                }
            }
            else {
                return commandLine;
            }
        }

        const processedCommandLine = commandToRun(commandLine.trim());
        const [command, ...args] = processedCommandLine.split(' ');

        switch (command.trim()) {
            case 'history':
                this.history.slice(0).reverse().forEach(line => this.stdout(`> ${line.id} - ${line.command}`));
                break;
            case 'test':
                const depth = args[0];
                this.log({
                    prop: 'value',
                    propArray: ['value1', 'value2'],
                    propObject: {
                        prop1: 'value1',
                        prop2: 'value2',
                        prop3: {
                            testString: 'This is my cool string!',
                            testMultiLine: `This is a
                            multiline string`,
                            testNumber: 123.01,
                            testBoolean: true,
                            testUndefined: undefined,
                            testNull: null,
                            testArray: [
                                'This',
                                'should',
                                'not',
                                'show',
                                'with',
                                'default',
                                'depth'
                            ],
                            testObject: {
                                message: 'Same with the object!'
                            },
                        }
                    }
                }, depth);
                break;
            case 'http':
                const httpRequest = new HttpRequest(this);
                try {
                    const response = await httpRequest.run(...args);
                    this.log(response);
                    // response.split('\n').forEach(line => this.stdout(line));
                }
                catch (error) {
                    this.stderr(error.message);
                }
                break;
            case 'ping': 
                const ping = new Ping(this);
                await ping.run(...args);
                break;
            case 'clear':
                return { command: 'clear' };
            case 'anyKey':
                try {
                    await this.readChar('Press any key to continue...');
                }
                catch (error) {
                    this.stderr(error, { updateMode: true });
                    console.log('readChar Rejection:', error);
                }
                break;
            case 'yesno':
                try {
                    const response = await this.readChar('Select an option: ', ['y', 'n'], 'y', false);
                    this.stdout(`You selected ${response}`);
                }
                catch (error) {
                    this.stderr(error, { updateMode: true });
                }
                break;
            case 'password':
                try {
                    const data = await this.readSecure('Enter password: ');
                    this.stdout(`Password: ${data}`);
                }
                catch (error) {
                    // Swallow
                    this.stderr(error, { updateMode: true });
                    console.log('readSecure Rejection:', error);
                }
                break;
            case 'input':
                try {
                    const data = await this.readLine('Enter something: ');
                    this.stdout(`Result: ${data}`);
                }
                catch (error) {
                    // Swallow
                    this.stderr(error, { updateMode: true });
                    console.log('readLine Rejection:', error);
                }
                break;
            case 'help':
                `This is help:
                hello!
                Multi line thing!`.split('\n').forEach(line => this.stdout(line));
                await new Promise(resolve => setTimeout(resolve, 1000));
                break;
            default:
                this.stderr(`Command '${command}' not found.`);
                break;
        }

        this.commandId++;
        this.addHistory(processedCommandLine, this.commandId);
    }
}