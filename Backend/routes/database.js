var express = require('express');
var router = express.Router();

let Course = require('../schema/course_schema');

/* GET users listing. */
router.get('/fetchData', function (req, res, next) {
  Course.find({}, function(err, courses){
    if(err){
      console.log(err);
    }
    else{
      res.json(courses);
    }
  });
});

//api for admin use only
router.post('/addData', function (req, res, next) {

  const name = req.body.name;
  const location = req.body.location;
  const school = req.body.school;
  const time = req.body.time;
  const course_number = Number(req.body.course_number);
  const department = req.body.department;
  const description = req.body.description;
  const component = req.body.component;
  const units = req.body.units;

  const courseObj = {
    name,
    location,
    school,
    units,
    time,
    course_number,
    department,
    description,
    component
  }

  console.log(courseObj);

  const newCourse = new Course(courseObj);

  newCourse.save()
    .then(() => res.json('User added'))
    .catch(err => res.status(400).json('Error: ' + err))
});

class Recitation{
  constructor(name, time){
    this.name = name
    this.time = time
  }
}
class Lecture{
  constructor(name,time){
    this.name = name;
    this.time = time;
  }
}
class CourseFactory{
  getClass(isRec, name, time){
    if(isRec){
      return new Recitation(name,time)
    }
    return new Lecture(name, time)
  }
}

module.exports = router;
