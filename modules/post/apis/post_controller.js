const mongoose = require('mongoose');
const PostModel = require('../models/post_model');
const UserModel = require('../../authentication/models/usermodel');
const CommentModel = require('../../comment/models/comment_model');
const SubCommentModel = require('../../comment/models/sub_comment_model');
const giveResponse = require('../../../utils/giveResponse');
const usermodel = require('../../authentication/models/usermodel');



async function getSubComment(commentId) { 
    const listSubComment = await SubCommentModel.find({ commentId: commentId });
    var subCommentList = await Promise.all(listSubComment.map(async (element) => {
        var SubUser = await UserModel.findById(element.userId);
        var subComments = {
            _id: element._id,
            subCommentTxt: element.subCommentTxt,
            subCommentTime: element.subCommentTime,
            user: {
                userId: SubUser._id,
                email: SubUser.email,
                username: SubUser.username,
                profilepic: SubUser.profilepic
            },
        };
        return subComments;
    }));
    return subCommentList; 
}

async function getCommentbyPostID(postId) {
    var comments = await CommentModel.find({ postId: postId });
    var commentsWithDetais = await Promise.all(comments.map(async (element) => {
        var user = await UserModel.findById(element.userId);
        var comment = {
            commentId: element._id,
            commentTxt: element.commentTxt,
            commentTime: element.commentTime,
            subComment: await getSubComment(element._id) ?? [],
            user: {
                userId: user._id,
                username: user.username,
                profilepic: user.profilepic
            },
        };
        return comment;
    }));
    return commentsWithDetais; 
}

async function addPost(req, res, next) {
    try {
        const { postLink, postStatus, postTime, } = req.body; 
        var postData = await PostModel.create(
            {
                postLink: postLink,
                postOwnerId: req.userId,
                postStatus: postStatus,
                postTime: postTime,
            }
        );
        const CreatedPost = await postData.save();
        return giveResponse(req, res, true, 200, "Post Uploaded Successfully", CreatedPost);        
    } catch (err) {
        console.log(err);
        return giveResponse(req, res, false, 400, "Something went wrong", {});

     }
 };

async function getPosts(req, res, next) {
    try {
        var postData = await PostModel.find();

        console.log(`:::::: ${req.userId}`); 

        var AllPosts = await Promise.all(postData.map(async (element) => {
            var user = await UserModel.findById(element.postOwnerId);
            element.users = user;
            var isLike = await element.likeUserId.includes(req.userId); 
            var posts = await {
                _id : element._id, 
                postLink: element.postLink,
                postLike: element.postLike,
                postLiked: isLike, 
                postCommentCount: element.postCommentCount,
                postStatus: element.postStatus,
                postTime: element.postTime,
                comments: await getCommentbyPostID(element._id) ?? [], 
                postOwner: {
                    userId: element.postOwnerId,
                    email: user.email,
                    username: user.username,
                    profilepic: user.profilepic
                }
            };
            return posts;
        }));
        // const CreatedPost = await postData.save();
        return giveResponse(req, res, true, 200, "All Post Fetch Done...", AllPosts);
    } catch (err) {
        console.log(err);
        return giveResponse(req, res, false, 400, "Something went wrong", {});

    }
};


async function likePost(req,res, next ) {
    try {
        var postId = req.query.postId; 
        var Post = await PostModel.findById(postId);
        const isLike = await Post.likeUserId.includes(req.userId);
        if (isLike) {
            Post.likeUserId.pull(req.userId);
            Post.postLike = Post.likeUserId.length; 
            await Post.save();
            return giveResponse(req, res, true, 200, "Post Disliked.. ", Post);
        } else { 
            Post.likeUserId.push(req.userId);
            Post.postLike = Post.likeUserId.length; 
            await Post.save();
            return giveResponse(req, res, true, 200, "Post Liked..", Post);
        }
    } catch (err) { 
        console.log(` Error is ${err}`);
        return giveResponse(req, res, false, 400, "Something went wrong", {});
    }

}


module.exports = { addPost, getPosts, likePost }; 