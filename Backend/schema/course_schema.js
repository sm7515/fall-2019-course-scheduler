const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    name: {
        type: String,
        required: true,
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
    units:{
        type: Number,
        required:true
    },
    time: {
        type:String,
        required: true,
    },
    course_number:{
        type:Number,
        unique: true,
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
    },
    component:{
        type:String,
        required:true
    }
}, {
    timestamps: true,
});

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;
