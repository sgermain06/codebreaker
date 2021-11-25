const domains = require('../hackingScenarios');

module.exports = class ScanVulnerabilities {

    constructor(terminal, options = {}) {
        this.terminal = terminal;
        this.options = options;
    }

    async run(ipAddress) {
        this.terminal.stdout(`Scanning ${ipAddress} for vulnerabilities...`);
        return new Promise(async resolve => {
            const v = domains.findVulnerabilityByIp(ipAddress);
            await new Promise(resolve => setTimeout(resolve, 2000));

            if (v) {
                this.terminal.log(v);
                this.terminal.stdout(`Found ${v.length} vulnerabilities for ${ipAddress}.`);
            }
            else {
                this.terminal.stderr(`No vulnerabilities found for ${ipAddress}`);
            }
            resolve();
        });
    }
};