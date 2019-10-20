const assert = require('chai').assert;
const User = require('../schema/user_schema'); //imports the user model.
console.log(User)
const userData = { name: 'Rob', gender: 'Male', school: 'CAS', year: 'Junior', dateCreated:new Date()};

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
        assert.isAtLeast(validUser.name.length, 3);
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
        assert.isAbove(validUser.school.length,0);
        done();
    });

    it('year should not be null or undefined', (done) => {
        assert.exists(validUser.year, 'year is not defined or null');
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
