const allDomains = require('./domains');

module.exports = {
    getAllDomains: () => allDomains.map(domain => domain.domain),
    findVulnerabilityByIp: (ip) => {
        const vulnerabilities = allDomains.find(domain => Object.keys(domain.vulnerabilities).includes(ip));
        
        if (vulnerabilities) {
            if (Object.keys(vulnerabilities.vulnerabilities).includes(ip)) {
                return vulnerabilities.vulnerabilities[ip];
            }
        }
        return;
    },
};
    