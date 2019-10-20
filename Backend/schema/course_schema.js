const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
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
    school:{
        type: String,
        required: true,
    },
    time: {
        type:String,
        required: true,
    },
    course_number:{
        type:Number,
        required: true,
    },
    department:{
      type:String,
      required: true,
      minlength: 4
    },
    description:{
        type:String,
        required: true,
    }
}, {
    timestamps: true,
});

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;
