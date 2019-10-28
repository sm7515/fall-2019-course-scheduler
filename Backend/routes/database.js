var express = require('express');
var router = express.Router();

let Course = require('../schema/course_schema');

/* GET users listing. */
router.get('/fetchData', function(req, res, next) {

    //TODO: Fetch data from database  
    Course.find()
      .then(course => res.json(course))
      .catch(err => res.status(400).json('Error: ' + err))

});

router.post('/addData', function (req, res, next) {
    // console.log(req.body);
    // var jsonObj = JSON.parse(req.body);

    const name = req.body.name;
    const location = req.body.location;
    const school = req.body.school;
    const time = req.body.time;
    const course_number= Number(req.body.course_number);
    const department = req.body.department;
    const description = req.body.description;

    const courseObj = {
      name,
      location,
      school,
      time,
      course_number,
      department,
      description
    }

    const newCourse = new Course(courseObj);

    newCourse.save()
        .then(() => res.json('User added'))
        .catch(err => res.status(400).json('Error: ' + err))
    });

module.exports = router;
