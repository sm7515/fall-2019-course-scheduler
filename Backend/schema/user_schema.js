const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
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
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;