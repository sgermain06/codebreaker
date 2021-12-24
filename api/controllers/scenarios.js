const Scenarios = require('../models/scenarios');

module.exports = {
    scenariosGetAll: async req => await Scenarios.getAll(req.query),
    scenarioDetails: async req => await Scenarios.getById(req.params.id),
    scenarioCreate: async (req, h) => {
        const { name, elements } = req.orig.payload;
        return h.response(await Scenarios.create({ name, elements })).code(201);
    },
    scenarioUpdate: async req => {
        const id = req.params.id;
        const { name, elements } = req.orig.payload;
        return await Scenarios.update(id, { name, elements });
    },
    scenarioDelete: async req => await Scenarios.delete(req.params.id),
}