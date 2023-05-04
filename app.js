const connection = require('./connnection/connection.js');
const login = require("./modules/authentication/apis/login.js")
const commentController = require("./modules/comment/apis/comment")
const postController = require("./modules/post/apis/post_controller")
const giveResponse = require("./utils/giveResponse");
var csvController = require("./utils/csv_to_json");

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
connection.app.get("/getAggregate", login.authenticate, postController.getAggregate,);
connection.app.post("/addComment", login.authenticate, commentController.addComment,);
connection.app.post("/addSubComment", login.authenticate, commentController.addSubComment,);


/// read from CSV and get into JSON. 
const multer = require('multer');
const upload = multer();
connection.app.post("/CSVtoJSON", upload.single('csv'), csvController.convertToJson,);

