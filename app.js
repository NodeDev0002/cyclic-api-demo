const connection = require('./connnection/connection.js');
const login = require("./modules/authentication/apis/login.js")
const commentController = require("./modules/comment/apis/comment")
const postController = require("./modules/post/apis/post_controller")
const giveResponse = require("./utils/giveResponse");


connection.app.get("/", (req, res) => { 
    console.log(" API Running"); 
    return giveResponse(req, res, true, 200, "!  ..........API IS WORKING FINE...... !", {});
});

/// Authentication Routes.. 
connection.app.post("/login", login.login,);
connection.app.post("/createAccount", login.createAcc,);
connection.app.post("/updateProfile", login.authenticate, login.updateProfile,);

///Post Manage Routes..
connection.app.get("/getPosts", login.authenticate, postController.getPosts,);
connection.app.post("/addPost", login.authenticate, postController.addPost,);
connection.app.get("/likePost", login.authenticate, postController.likePost,);
connection.app.post("/addComment", login.authenticate, commentController.addComment,);
connection.app.post("/addSubComment", login.authenticate, commentController.addSubComment,);

