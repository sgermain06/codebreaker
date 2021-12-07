const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const schema = new Schema({
    name: String,
});

const Domains = Mongoose.model('domains', schema);

const getAll = async ({ page, size, search }) => {

    const fields = Object.keys(Domains.schema.obj);

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

    const results = await Domains.aggregate([{ '$facet': query }]);
    const { records, totalRecords } = results[0];
    return { totalRecords: get(totalRecords, '0.totalRecords', 0), records };
};

module.exports = ({
    getAll,
    schema,
})