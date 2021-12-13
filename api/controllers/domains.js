const Domains = require('../models/domains');

module.exports = {
    domainsGetAll: async req => await Domains.getAll(req.query),
    domainDetails: async req => await Domains.getById(req.params.id),
    domainCreate: async (req, h) => {
        const { name } = req.orig.payload;
        return h.response(await Domains.create({ name })).code(201);
    },
    domainUpdate: async req => {
        const id = req.params.id;
        const { name } = req.orig.payload;
        return await Domains.update(id, { name });
    },
}