const mongoose = require('mongoose');

const userModel = new mongoose.Schema({
    username: String, 
    email: String, 
    password: String, 
    profilepic: String, 

},
{strict : true},
);

module.exports = mongoose.model('users', userModel);

