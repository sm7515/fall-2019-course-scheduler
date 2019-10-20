const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
  name:{
    type: String,
    required: true
  },
/*  school:{
    type:mongoose.Schema.Types.ObjectID,
    ref:'School'
  },*/
  course_number:{
    type: String,
    required: true
  },
  description:{
    type: String,
    required: true
  },
  location:{
    type:String,
    required:true
  },
  time:{
    type:String,
    required:true,
  },
  prerequisite:[{
    type:mongoose.Schema.Types.ObjectID,
    ref:'Course'
  }]
});
const Course = mongoose.model('Course', courseSchema);
module.export=  Course;
