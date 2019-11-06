const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password:{
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        unique: true
    },
    gender: {
        type: String,
        required: true,
    },
    school:{
        type: String,
        required: true,
    },
    year:{
        type:String,
        required: true,
    },
    dateCreated:{
        type:Date,
        required: true,
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
