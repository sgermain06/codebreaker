const domains = require('../hackingScenarios');

module.exports = class Dig {

    constructor(terminal, options = {}) {
        this.terminal = terminal;
        this.options = options;
    }

    async run(domain) {
        const existingDomains = domains.getAllDomains();

        if (existingDomains.includes(domain)) {
            const domainInfo = require(`../hackingScenarios/domains/${domain}`);
            this.terminal.log(domainInfo.subdomains);
        }
        else {
            this.terminal.stderr(`Domain ${domain} not found.`);
        }
    }
};