const Players = require('../models/players');

module.exports = {
    playersGetAll: async req => await Players.getAll(req.query),
    playerDetails: async req => await Players.getById(req.params.id),
    playerCreate: async (req, h) => {
        const { name, username, password } = req.orig.payload;
        return h.response(await Players.create({ name, username, password })).code(201);
    },
    playerUpdate: async req => {
        const id = req.params.id;
        const { name, username, password } = req.orig.payload;
        return await Players.update(id, { name, username, password });
    },
}