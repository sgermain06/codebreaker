const Subdomains = require('../models/subdomains');

module.exports = {
    subdomainsGetAll: async req => await Subdomains.getAll(req.query),
    subdomainsGetByIpAddress: async req => {
        const { service } = req.params;
        return await Subdomains.findByIPAddress(service, req.query);
    },
    subdomainDetails: async req => await Subdomains.getById(req.params.id),
    subdomainCreate: async (req, h) => {
        const { name, ipAddress, domain, vulnerabilities } = req.orig.payload;
        return h.response(await Subdomains.create({ name, ipAddress, domain, vulnerabilities })).code(201);
    },
    subdomainUpdate: async req => {
        const id = req.params.id;
        const { name, ipAddress, domain, vulnerabilities } = req.orig.payload;
        return await Subdomains.update(id, { name, ipAddress, domain, vulnerabilities });
    },
}