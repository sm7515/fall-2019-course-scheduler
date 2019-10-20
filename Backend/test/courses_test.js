const assert = require('chai').assert;
const Course = require('../schema/course_schema');
console.log(process.cwd());
console.log(Course);
describe("course_schema test:", ()=>{
  const course_data = {name:"Computer System Organization",
      course_number:"CS201",
      description: "This is a test course.",
      location:"Courant",
      time:"TuThu 2-3:15pm"
  };
  const test_course = new Course(course_data);
  it('Save well-defined object to db', function (done) {

    let error;
    test_course.save((err)=>{
      error = err;
    });

    assert.isUndefined(error, 'Well defined input is not saved successfully');
    done();
  });
})
