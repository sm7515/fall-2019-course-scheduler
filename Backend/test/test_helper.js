const mongoose = require('mongoose');
const dotenv = require('dotenv');
mongoose.Promise = global.Promise;
dotenv.config({path: '../.env'});

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }, (err) => {
});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

beforeEach((done) => {
    mongoose.connection.collections.users.drop(() => {
        done();
    });
});

after(function (done) {
    mongoose.connection.db.dropDatabase(function () {
        mongoose.connection.close(done);
    });
});
