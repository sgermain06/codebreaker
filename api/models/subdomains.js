const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;
const Domain = require('./domains');
const Vulnerability = require('./vulnerabilities');

const {
    mapValues,
    get,
    isEmpty,
    pickBy,
} = require('lodash');

const schema = new Schema({
    domain: {
        type: Schema.Types.ObjectId,
        ref: Mongoose.model('domains', Domain.schema),
    },
    name: String,
    ipAddress: String,
    vulnerabilities: [{
        type: Schema.Types.ObjectId,
        ref: Mongoose.model('vulnerabilities', Vulnerability.schema),
    }],
});

const relativeObjects = [
    'domain',
    {
        path: 'vulnerabilities',
        match: { deleted: { $ne: true }}
    }
];

const Subdomains = Mongoose.model('subdomains', schema);

const findByDomainId = async (domainId, { page, size }) => {
    const match = { domain: domainId };

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

    const results = await Subdomains.Subdomain([{ '$facet': query }]);
    const { records, totalRecords } = results[0];
    return { totalRecords: get(totalRecords, '0.totalRecords', 0), records };
};

const findByVulnerabilityId = async (vulnerabilityId, { page, size }) => {
    const match = { vulnerability: vulnerabilityId };

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

    const results = await Subdomains.Subdomain([{ '$facet': query }]);
    const { records, totalRecords } = results[0];
    return { totalRecords: get(totalRecords, '0.totalRecords', 0), records };
};

const findByIpAddress = async ipAddress => await Subdomains.findOne({ ipAddress });

const create = async (props) => {
    let subdomain = await new Subdomains(props).save();
    for (let key of relativeObjects) {
        subdomain = await subdomain.populate(key);
    }
    return subdomain;
};

const update = async (id, props) => {
    await Subdomains.findByIdAndUpdate(id, props);
    return { id };
};

const getById = async id => await Subdomains.findById(id);

const getAll = async ({ page, size, search }) => {

    const fields = Object.keys(pickBy(mapValues(Subdomains.schema.obj, i => i.name === 'String' ? i.name : null), i => !isEmpty(i)));

    const match = {};
    if (!isEmpty(search)) {
        const regexp = new RegExp(search, 'i');
        match['$or'] = fields.map(field => ({ [field]: regexp }));
    }

    const totalRecords = await Subdomains.count(match);
    const records = await Subdomains.find(match).skip((Math.max(page, 1) - 1) * size).limit(size).select('-__v').populate('domain').populate({
        path: 'vulnerabilities',
        match: { deleted: { $ne: true }},
        select: '-deleted -__v',
    });

    return { totalRecords, records };
};

module.exports = {
    schema,
    findByDomainId,
    findByVulnerabilityId,
    findByIpAddress,
    getAll,
    create,
    update,
    getById,
};