const mongoose = require('mongoose');
const schema = mongoose.Schema;

const {
    get,
    isEmpty,
    isNil,
    isNumber,
    pickBy,
} = require('lodash');

const Vulnerabilities = mongoose.model('vulnerabilities', schema({
    name: String,
    service: String,
    version: String,
    description: String,
}));

exports.findByService = async (service, { page, size, version }) => {

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

exports.create = async (props) => {
    const vulnerability = new Vulnerabilities(props);
    return await vulnerability.save();
};

exports.update = async (id, props) => {
    await Vulnerabilities.findByIdAndUpdate(id, props);
    return { id };
};

exports.getAll = async ({ page, size, search }) => {

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
exports.getById = async id => await Vulnerabilities.findById(id);
