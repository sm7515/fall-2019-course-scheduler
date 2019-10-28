const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schoolSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    location: {
        type: String,
        required: true,
    },
    department:{
        type: Array,
        required: true,
    },
    Dean: {
        type:String,
        required: true,
    },
    course_limit:{
        type:Number,
        required: true,
    },
    course_number:{
        type:String,
        required: true,
        minlength: 4
    },
    description:{
        type:String,
        required: true,
    },
    year:{
        type:Number,
        required:true,
    }
});

const School = mongoose.model('School', schoolSchema);
module.exports = School;