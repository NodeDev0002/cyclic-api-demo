const connection = require('./connnection/connection.js');
const login = require("./modules/authentication/apis/login.js")


connection.app.get("/", (req, res) => { 
    console.log(" API Running"); 
    res.send('api running >> ');
});

/// Authentication Routes.. 
connection.app.post("/login", login.login,);

connection.app.post("/createAccount", login.createAcc,);
connection.app.post("/updateProfile", login.authenticate , login.updateProfile,);