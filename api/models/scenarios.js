const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const {
    get,
    isEmpty,
    omit,
} = require('lodash');

const schema = new Schema({
    name: {
        type: String
    },
    elements: [{
        type: Object
    }],
    deleted: {
        type: Boolean,
        default: false
    }
});

const Scenarios = Mongoose.model('scenarios', schema);

const create = async (props) => {
    const scenario = new Scenarios(props);
    return await scenario.save();
};

const update = async (id, props) => {
    await Scenarios.findByIdAndUpdate(id, props);
    return { id };
};

const getAll = async ({ page, size, search = '' }) => {

    const fields = ['name'];

    const match = {
        deleted: { '$ne': true }
    };
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

    const results = await Scenarios.aggregate([{ '$facet': query }]);
    const { records, totalRecords } = results[0];
    return { totalRecords: get(totalRecords, '0.totalRecords', 0), records: records.map(record => omit(record, ['password'])) };
};
const getById = async id => await Scenarios.findById(id);
const deleteById = async id => await Scenarios.findByIdAndUpdate(id, { $set: { deleted: true }});

module.exports = {
    create,
    update,
    getAll,
    getById,
    delete: deleteById,
    schema,
}