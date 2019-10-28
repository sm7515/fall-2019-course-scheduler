const assert = require('chai').assert;

const School = require('../schema/course_schema'); //imports the user model.

const userData = { name: 'CAS',
    location: 'NYC',
    department: ['Math Department'],
    Dean: 'Obama',
    course_limit:5,
    course_number:3,
    description:'test',
    year:1520

};

describe('Data entry validation',()=> {
    const school = new School(userData);

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
    
    it('name should not be null', (done) => {
        assert.exists(school.name, 'username is not defined or null');
        done();
    });
    
    it('location should not be null', (done) => {
        assert.exists(school.name, 'username is not defined or null');
        done();
    });
    
    it('department should not be null', (done) => {
        assert.exists(school.name, 'username is not defined or null');
        done();
    });

    it('Dean name should not be empty',function (done) {
        assert.notEqual(school.Dean,'',"Dean should not be null");
        done();
    });
    
    it('name should not be empty', (done) => {
        assert.notEqual(school.name, '','username is not defined or null');
        done();
    });
    
    it('location should not be empty', (done) => {
        assert.notEqual(school.name, '','username is not defined or null');
        done();
    });
    
    it('department should not be empty', (done) => {
        assert.notEqual(school.name, '','username is not defined or null');
        done();
    });
    it('year should not be empty', (done) => {
        assert.notEqual(school.year, '','username is not defined or null');
        done();
    });
    it('year should not be null', (done) => {
        assert.isNotNull(school.year, 'year is not defined or null');
        done();
    });







})
