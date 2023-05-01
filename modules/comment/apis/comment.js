const mongoose = require('mongoose');
const CommentModel = require('../models/comment_model');
const PostModel = require('../../post/models/post_model');
const SubCommentModel = require('../models/sub_comment_model');

const giveResponse = require('../../../utils/giveResponse');





async function addComment(req, res, next) {
    try {
        const { commentTxt, postId , commentTime, } = req.body;
        var comment = await CommentModel.create(
            {
                userId: req.userId, 
                postId: postId,
                commentTxt: commentTxt,
                commentTime: commentTime,
            }
        );
        const commentCount = await CommentModel.find({ postId: postId });
        await PostModel.findByIdAndUpdate({ _id: postId }, { postCommentCount: commentCount.length });
        var comments = await comment.save();
        return giveResponse(req, res, true, 200, "Comment Done.. ", comments);        
    } catch (err) {
        console.log(err);
        return giveResponse(req, res, false, 400, "Something went wrong", {});

    }
}

async function addSubComment(req, res, next) {
    try {
        const { subCommentTxt, commentId, subCommentTime, } = req.body;
        var subComment = await SubCommentModel.create(
            {
                userId: req.userId,
                commentId: commentId,
                subCommentTxt: subCommentTxt,
                subCommentTime: subCommentTime,
            }
        );
        var subCommentUpdates = await subComment.save();
        return giveResponse(req, res, true, 200, "Add Subcomment Done.. ", subCommentUpdates);
    } catch (err) {
        console.log(err);
        return giveResponse(req, res, false, 400, "Something went wrong", {});

    }
}

module.exports = { addComment, addSubComment };