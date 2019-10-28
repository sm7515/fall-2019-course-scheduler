let chai = require('chai');
let chaiHttp = require('chai-http');
let expect = chai.expect;
var should = chai.should();
chai.use(chaiHttp);

let server = require('../app');

describe('Test Routes Of Express Server', () => {

    //Test #1
    it("Test / route", (done) => {
        chai.request(server)
            .get('/')
            .end((err,res) => {
                (res).should.have.status(200);
                done();
            });
    });

    //Test #2
    it("Test / GET text", (done) => {
        chai.request(server)
            .get('/')
            .end((err,res) => {
                (res).should.have.status(200);
                expect(res.text).to.equal('This is the root');
                done();
            });
    })

    //Test #3
    it("Test users route", (done) => {
        chai.request(server)
            .get('/users')
            .end((err,res) => {
                (res).should.have.status(200);
                done();
            });
    })

    //Test #4
    it("Test users POST /login", (done) => {

        //Testing data
        let obj = {
            'username': "justin",
            'password': "12345"
        }
        chai.request(server)
            .post('/users/login')
            .type('form')
            .send(obj)
            .end((err,res) => {
                (res).should.have.status(200);
                (res.body).should.be.a('object');
                expect(res.body).to.eql(obj)
                done();
            });
    })

    //Test #5
    it("Test /users POST /register", (done) => {

        //Testing data
        let obj = {
            'username': "justin",
            'password': "12345",
            'email' : 'something@gmail.com'
        }
        chai.request(server)
            .post('/users/register')
            .type('form')
            .send(obj)
            .end((err,res) => {
                (res).should.have.status(200);
                (res.body).should.be.a('object');
                expect(res.body).to.eql(obj)
                done();
            });
    })

    //#6
    it("Test /database GET /fetchdata", (done) => {

        
        chai.request(server)
            .get('/database/fetchData')
            .end((err,res) => {
                (res).should.have.status(200);
                (res.body).should.be.a('object');
                done();
            });
    })

    //#7
    it("Test /database POST /addData", (done) => {

        //Testing data
        let obj = {
            'username': "justin",
            'password': "12345",
            'email' : 'something@gmail.com'
        }
        chai.request(server)
            .post('/database/addData')
            .type('form')
            .send(obj)
            .end((err,res) => {
                (res).should.have.status(200);
                (res.body).should.be.a('object');
                expect(res.body).to.eql(obj)
                done();
            });
    })

    //#8
    it("Test error GET", (done) => {

        chai.request(server)
            .get('/randomroute')
            .end((err,res) => {
                (res).should.have.status(404);
                done();
            });
    })

    //#9
    it("Test error POST", (done) => {

        let obj = {
            "name" : "12345"
        }
        chai.request(server)
            .post('/randomroute')
            .type('form')
            .send(obj)
            .end((err,res) => {
                (res).should.have.status(404);
                done();
            });
    })

    //#10
    it("Test /users POST /add Schema", (done) => {

        let obj = {
            'username': "justin",
            'school': 'NYU',
            'year': "2017",
            'date' : '06-28-2019'
        }

        chai.request(server)
            .post('/users/add')
            .type('form')
            .send(obj)
            .end((err,res) => {
                (res).should.have.status(200);
                console.log(err);
                done();
            });
    })

    
});
