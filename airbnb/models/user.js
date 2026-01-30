const mongoose = require('mongoose');

const userSchema = mongoose.Schema({

    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    usertype: {
        type: String,
        enum: ['user', 'host'],
        default: 'user',
    },
});


module.exports = mongoose.model('User', userSchema);