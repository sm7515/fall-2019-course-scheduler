const assert = require('chai').assert;
const School = require('../schema/school_schema'); 
const Course = require('../schema/course_schema');
const User = require('../schema/user_schema'); //imports the user model.
const userData = { name: 'Rob', gender: 'Male', school: 'CAS', year: 'Junior', dateCreated:new Date()};

const schoolData = { name: 'CAS',
    location: 'NYC',
    department: ['Math Department'],
    Dean: 'Obama',
    course_limit:5,
    course_number:3,
    description:'test',
    year:1520

};

describe('school data entry validation',()=> {
    const school = new School(schoolData);

    it('Dean name should not be null',function (done) {
        assert.isNotNull(school.Dean,"Dean should not be null");
        done();
    });
    
    it('CourseLimit not be null', (done) => {
        assert.isNotNull(school.course_limit, 'courseLimit is not defined or null');
        done();
    });
    
    it('CourseAmount not be null', (done) => {
        assert.isNotNull(school.course_number, 'courseLimit is not defined or null');
        done();
    });
    
    it('CourseLimit not be 0', (done) => {
        assert.notEqual(school.course_limit, 0,'courseLimit can not be zero');
        done();
    });
    
    it('CourseAmount not be 0', (done) => {
        assert.notEqual(school.course_number,0, 'courseAmount can not be zero');
        done();
    });
    
    it('name should not be null', (done) => {
        assert.exists(school.name, 'name is not defined or null');
        done();
    });
    
    it('location should not be null', (done) => {
        assert.exists(school.name, 'location is not defined or null');
        done();
    });
    
    it('department should not be null', (done) => {
        assert.exists(school.name, 'department is not defined or null');
        done();
    });

    it('Dean name should not be empty',function (done) {
        assert.notEqual(school.Dean,'',"Dean should not be null");
        done();
    });
    
    it('name should not be empty', (done) => {
        assert.notEqual(school.name, '','name is not supposed to be empty');
        done();
    });
    
    it('location should not be empty', (done) => {
        assert.notEqual(school.name, '','location is not supposed to be empty');
        done();
    });
    it('descrption should not be empty', (done) => {
        assert.notEqual(school.description, '','description is not supposed to be empty');
        done();
    });
    it('department should not be empty', (done) => {
        assert.notEqual(school.name, '','department is not supposed to be empty');
        done();
    });
    it('year should not be empty', (done) => {
        assert.notEqual(school.year, '','year is not supposed to be empty');
        done();
    });
    
    it('year should not be null', (done) => {
        assert.isNotNull(school.year, 'year is not defined or null');
        done();
    });

})

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

describe('create & save user successfully', () => {
    const validUser = new User(userData);

    it('Object Id should be defined when successfully saved to MongoDB.', function (done) {
        assert.isDefined(validUser._id, 'user is not saved to MongoDB');
        done();
    });

    it('username should match', function (done) {
        assert.equal(validUser.name, userData.name, 'username doesn\'t match');
        done();
    });

    it('gender should match', function (done) {
        assert.equal(validUser.gender, userData.gender, 'gender doesn\'t match');
        done();
    });

    it('school should match', function (done) {
        assert.equal(validUser.school, userData.school, 'school doesn\'t match');
        done();
    });

    it('year should match', function (done) {
        assert.equal(validUser.year, userData.year, 'year doesn\'t match');
        done();
    });

    it('dateCreated should match', function (done) {
        assert.equal(validUser.dateCreated, userData.dateCreated, 'dateCreated doesn\'t match');
        done();
    });

    it('user saved to test database', function (done) {
        validUser.save(done);
    });

    it('user should be defined', (done) => {
        assert.isDefined(validUser, 'user is not defined');
        done();
    });

    it('user should not be null', (done) => {
        assert.exists(validUser, 'user is null');
        done();
    });
});

describe('validate user fields', () => {

    const validUser = new User(userData);
    validUser.save();

    it('Should not add field that isn\'t defined in the Schema', (done) => {
        assert.isUndefined(validUser.nickname, 'nickname is not a field in Schema');
        done();
    })

    it('name should not be null or undefined', (done) => {
        assert.exists(validUser.name, 'username is not defined or null');
        done();
    });

    it('name length should be at least 3', (done) => {
        assert.isAtLeast(validUser.name.length, 3,'name length should be at least 3');
        done();
    });

    it('gender should not be null or undefined', (done) => {
        assert.exists(validUser.gender, 'gender is not defined or null');
        done();
    });

    it('gender should be female, male, or other', (done) => {
        assert.include(['female','male','other'],validUser.gender.toLowerCase(),'invalid gender');
        done();
    });

    it('school should not be null or undefined', (done) => {
        assert.exists(validUser.school, 'school is not defined or null');
        done();
    });

    it('school name should not be an empty string', (done) => {
        assert.isAbove(validUser.school.length,0,'school name is empty');
        done();
    });

    it('year should not be null or undefined', (done) => {
        assert.exists(validUser.year, 'year is not defined or null');
        done();
    });

    it('year should not be an empty string', (done) => {
        assert.isAbove(validUser.year.length,0, 'year is empty');
        done();
    });

    it('year should be valid', (done) => {
        assert.include(['freshman', 'sophomore', 'junior','senior'], validUser.year.toLowerCase(), 'invalid year');
        done();
    });

    it('date should not be null or undefined', (done) => {
        assert.exists(validUser.dateCreated, 'date is not defined or null');
        done();
    });

    it('create user without required field should failed', async () => {
        const userWithoutRequiredField = new User({ name: 'TekLoon' });
        let err;
        try {
            const savedUserWithoutRequiredField = await userWithoutRequiredField.save();
            error = savedUserWithoutRequiredField;
        } catch (error) {
            err = error
        }
        assert.isDefined(err,"invaid object can't be stored. ");
    });
});
