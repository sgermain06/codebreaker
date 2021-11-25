module.exports = class Ping {

    constructor(terminal, { defaultPingSteps = 4 } = {}) {
        this.terminal = terminal;
        this.defaultPingSteps = defaultPingSteps;
    }

    help() {
        `ping - utility that pings a host
        Usage:
        - ping host [steps] : Pings a host.
        - ping (help | -h | -?) : Brings up this cool little help text.
        Example:
        - ping google.com 10
        `.split('\n').forEach(line => this.terminal.stdout(line));
    }

    async run(host, ...options) {
        if (host === 'help' || host === '-h' || host === '-?') {
            this.help();
            return;
        }

        if (!host) {
            host = await this.terminal.readLine('Host: ');
        }

        return await new Promise(async resolve => {
            const pingSteps = options.length ? options[0] : this.defaultPingSteps;
            let step = 0;
            let shouldBreak = false;

            const finishPing = () => {
                this.terminal.stdout(`Ping processed ${step} requests to ${host}`);
                this.terminal.stdin(null);
                resolve();
            };

            this.terminal.stdin(char => {
                if (char === '^C') {
                    shouldBreak = true;
                    this.terminal.stderr('^C', { characterMode: true });
                }
            }, { characterMode: true });

            while (step < pingSteps) {
                if (shouldBreak) break;
                const pingReply = Math.floor(Math.random() * 100);
                this.terminal.stdout(`ping ${host} - ${pingReply}ms`, { caretAtEnd: true });
                if (step < pingSteps - 1) {
                    await new Promise(resolve => setTimeout(resolve, 1000));
                }
                step++;
            }
            finishPing();
        });
    }
}