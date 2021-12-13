const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const {
    get,
    isEmpty,
    isNil,
    isNumber,
    pickBy,
} = require('lodash');

const schema = new Schema({
    name: String,
    service: String,
    version: String,
    description: String,
    deleted: {
        type: Boolean,
        default: false
    },
});

const Vulnerabilities = mongoose.model('vulnerabilities', schema);

const findByService = async (service, { page, size, version }) => {

    const match = pickBy({
        service,
        version
    }, i => isNumber(i) || !isNil(i));

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

    const results = await Vulnerabilities.aggregate([{ '$facet': query }]);
    const { records, totalRecords } = results[0];
    return { totalRecords: get(totalRecords, '0.totalRecords', 0), records };
};

const create = async (props) => {
    const vulnerability = new Vulnerabilities(props);
    return await vulnerability.save();
};

const update = async (id, props) => {
    await Vulnerabilities.findByIdAndUpdate(id, props);
    return { id };
};

const getById = async id => await Vulnerabilities.findById(id);


const getAll = async ({ page, size, search }) => {

    const fields = Object.keys(Vulnerabilities.schema.obj);

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

    const results = await Vulnerabilities.aggregate([{ '$facet': query }]);
    const { records, totalRecords } = results[0];
    return { totalRecords: get(totalRecords, '0.totalRecords', 0), records };
};

module.exports = ({
    schema,
    getById,
    getAll,
    update,
    create,
    findByService,
});
