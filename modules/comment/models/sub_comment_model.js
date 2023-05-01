const mongoose = require('mongoose');

const subCommentSchema = mongoose.Schema({   
    userId : String, 
    commentId: String, 
    subCommentTxt: String, 
    subCommentTime: Date, 
});

module.exports = mongoose.model("sub_comments", subCommentSchema);