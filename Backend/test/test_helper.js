const mongoose = require('mongoose');
require('dotenv').config();
mongoose.Promise = global.Promise;

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }, (err) => { });
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