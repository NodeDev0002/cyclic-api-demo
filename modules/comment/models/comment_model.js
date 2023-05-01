const mongoose = require('mongoose');


const commentSchema = mongoose.Schema(
    {
        userId: String, 
        postId: String,
        commentTxt: String, 
        commentTime: Date,
    }
);

module.exports = mongoose.model("comments", commentSchema);
