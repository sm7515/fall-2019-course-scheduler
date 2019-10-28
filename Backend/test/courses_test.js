const assert = require('chai').assert;
const Course = require('../schema/school_schema');

describe("course_schema test:", ()=>{

  it('Save well-defined object to db', function (done) {
    const course_data = {name:"Computer System Organization",
        course_number:201,
        description: "This is a test course.",
        location:"Courant",
        time:"TuThu 2-3:15pm",
        school:"COURANT",
        department:"CSCI"
    };
    const test_course = new Course(course_data);
    test_course.save((err)=>{
        assert.isNull(err, 'Well defined input is not saved successfully');
        done();
    });

  });
  it("Empty object shouldn't be saved", function(done){
    const empty_data = {};
    const empty_course = new Course(empty_data);
    try{
      empty_course.save((err)=>{
        assert.isNotNull(err, "Empty object shouldn\'t be saved. ");
        done();
      });
    }
    catch(err){
      
    }
  });

  it("Test name missing", function(done){
    const data_no_name = {
      description: "This is a test course.",
      course_number:201,
      location:"Courant",
      time:"TuThu 2-3:15pm",
      school:"courant",
      department:"CSCI"
    };
    const course_no_name = new Course(data_no_name);
    let error;
    course_no_name.save((err)=>{
      assert.isNotNull(err, 'Name missing object shouldn\'t be saved');
      done();
    });
  });

  it("Test course number missing", function(done){
    const data_no_number = {
      name:"CSO",
      description: "This is a test course.",
      location:"Courant",
      time:"TuThu 2-3:15pm",
      school:"courant",
      department:"CSCI"
    };
    const course_no_number = new Course(data_no_number);
    course_no_number.save((err)=>{
      assert.isNotNull(err, 'Course number missing object shouldn\'t be saved');
      done();
    });
  });

  it("Test course number type is wrong", function(done){
    const data_wrong_number = {
      name:"CSO",
      description: "This is a test course.",
      location:"Courant",
      time:"TuThu 2-3:15pm",
      school:"courant",
      department:"CSCI",
      course_number:"CS201"
    };
    const course_wrong_number = new Course(data_wrong_number);
    course_wrong_number.save((err)=>{
      assert.isNotNull(err, 'Course number incorrt object shouldn\'t be saved');
      done();
    });
  });


  it("Test location missing", function(done){
    const data_no_loc = {
      name:"CSO",
      description: "This is a test course.",
      course_number:201,
      time:"TuThu 2-3:15pm",
      school:"courant",
      department:"CSCI"
    };
    const course_no_loc = new Course(data_no_loc);
    course_no_loc.save((err)=>{
      assert.isNotNull(err, 'location missing object shouldn\'t be saved');
      done();
    });
  });

  it("Test time missing", function(done){
    const data_no_time = {
      name:"CSO",
      description: "This is a test course.",
      course_number:201,
      location:"Courant",
      school:"courant",
      department:"CSCI"
    };
    const course_no_time = new Course(data_no_time);
    course_no_time.save((err)=>{
      assert.isNotNull(err, 'Course time missing object shouldn\'t be saved');
      done();
    });
  });

  it("Test school missing", function(done){
    const data_no_school = {
      name:"CSO",
      description: "This is a test course.",
      course_number:201,
      location:"Courant",
      time:"TuThu 2-3:15pm",
      department:"CSCI"
    };
    const course_no_school = new Course(data_no_school);
    course_no_school.save((err)=>{
      assert.isNotNull(err, 'School missing object shouldn\'t be saved');
      done();
    });
  });

  it("Test department missing", function(done){
    const data_no_dep = {
      name:"CSO",
      description: "This is a test course.",
      course_number:201,
      location:"Courant",
      time:"TuThu 2-3:15pm",
    };
    const course_no_dep = new Course(data_no_dep);
    course_no_dep.save((err)=>{
      assert.isNotNull(err, 'Deparment missing object shouldn\'t be saved');
      done();
    });
  });

  it("Test department not long enough", function(done){
    const data_short_dep = {
      name:"CSO",
      description: "This is a test course.",
      course_number:201,
      location:"Courant",
      time:"TuThu 2-3:15pm",
      department:"UA"
    };
    const course_short_dep = new Course(data_short_dep);
    course_short_dep.save((err)=>{
      assert.isNotNull(err, 'Object without long enough deparment name shouldn\'t be saved');
      done();
    });
  });
});
