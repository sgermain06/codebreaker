const Vulnerabilities = require('../models/vulnerabilities');

module.exports = {
    vulnerabilitiesGetAll: async req => await Vulnerabilities.getAll(req.query),
    vulnerabilitiesGetByService: async req => {
        const { service } = req.params;
        return await Vulnerabilities.findByService(service, req.query);
    },
    vulnerabilityDetails: async req => await Vulnerabilities.getById(req.params.id),
    vulnerabilityCreate: async (req, h) => {
        const { name, service, version, description } = req.orig.payload;
        return h.response(await Vulnerabilities.create({ name, service, version, description })).code(201);
    },
    vulnerabilityUpdate: async req => {
        const id = req.params.id;
        const { name, service, version, description } = req.orig.payload;
        return await Vulnerabilities.update(id, { name, service, version, description });
    },
}