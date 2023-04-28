const connection = require('./connnection/connection.js');
const login = require("./modules/authentication/apis/login.js")
const giveResponse = require("./utils/giveResponse");


connection.app.get("/", (req, res) => { 
    console.log(" API Running"); 
    return giveResponse(req, res, true, 200, "!  ..........API IS WORKING FINE...... !", {});
});

/// Authentication Routes.. 
connection.app.post("/login", login.login,);

connection.app.post("/createAccount", login.createAcc,);
connection.app.post("/updateProfile", login.authenticate , login.updateProfile,);