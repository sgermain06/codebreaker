const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const schema = new Schema({
    title: {
        type: String
    },
    nodes: [{
        type: Object
    }]
});

module.exports = {
    schema,
}