const mongoose = require('mongoose');
const schema = mongoose.Schema;

const {
    get,
    omit,
    isEmpty,
} = require('lodash');

const Player = mongoose.model('players', schema({
    username: String,
    name: String,
    password: String,
}));

exports.getByUsername = async username => await Player.findOne({ username });

exports.create = async (props) => {
    const vulnerability = new Player(props);
    return await vulnerability.save();
};

exports.update = async (id, props) => {
    await Player.findByIdAndUpdate(id, props);
    return { id };
};

exports.getAll = async ({ page, size, search = '' }) => {

    const fields = Object.keys(omit(Player.schema.obj, 'password'));

    const match = {};
    if (!isEmpty(search)) {
        const regexp = new RegExp(search, 'i');
        match['$or'] = fields.map(field => ({ [field]: regexp }));
    }

    const query = {
        records: [
            { $match: match },
            { $skip: (Math.max(page, 1) - 1) * size },
            { $limit: size }
        ],
        totalRecords: [
            { $match: match },
            { $count: 'totalRecords' }
        ]
    };

    const results = await Player.aggregate([{ '$facet': query }]);
    const { records, totalRecords } = results[0];
    return { totalRecords: get(totalRecords, '0.totalRecords', 0), records: records.map(record => omit(record, ['password'])) };
};
exports.getById = async id => await Player.findOne({ id });
