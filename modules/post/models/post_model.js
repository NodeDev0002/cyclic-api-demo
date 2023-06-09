const mongoose = require('mongoose');


const postSchema = mongoose.Schema({
    postLink: String, 
    postOwnerId: {
        type: String, 
        ref: "users"
    }, 
    postStatus: String, 
    postTime: Date, 
    likeUserId : Array, 
    postLike: { type: Number , default : 0} , 
    postCommentCount: { type: Number, default: 0 }, 
});

module.exports = mongoose.model("posts", postSchema);