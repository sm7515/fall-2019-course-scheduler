const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const testSchema = new Schema({
    testOne: {
        type: String,
        required: true

    },
    testTwo: {
        type: Number,
        required: true
    }    
}, {
    timestamp: true,
});

const Test = mongoose.model('Test', testSchema);
module.exports = Test;