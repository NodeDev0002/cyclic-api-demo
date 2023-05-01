const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const usermodel = require('../models/usermodel');
const giveResponse = require('../../../utils/giveResponse')

const jwtsecretKey = "KEY-TEST-PROJECT#Secret";

function authenticate(req, res, next) {
    const authHeader = req.headers['authorization'];
    console.log(` headers is >>>> ${req.headers['authorization']}`);
    console.log(` email is >>>> ${req.body.email}`);
    if (!authHeader) {
        return giveResponse(req, res, false, 401, "Unauthorized", {});
    }
    const token = authHeader.split(' ')[1];
    // Verify the token
    jwt.verify(token, jwtsecretKey, (err, decoded) => {
        if (err) {
            return giveResponse(req, res, false, 401, 'token is not valid', {});
        }
        console.log(` token is ${token}`);
        console.log(` error is ${err}`);
        console.log(` decoded is ${decoded}`);
        req.email = decoded.email;
        req.userId = decoded.userId;
        next();
    });
    console.log(' --- TOKEN IS --- %s', token);
}


async function login(req, res, next) {   
    const { email, password } = req.body; 
    try {
        const { email, password } = req.body;
        var user = await usermodel.findOne({ email });
        if (!user) {
            return giveResponse(req, res, false, 400, "User not exist, Please create acc first.", {});
        }
        console.log(" PASSWORD IS %s", user.password);
        console.log(" PASSWORD IS %s", user.email);
            const isValidPassword = bcrypt.compareSync(password, user.password);
            console.log(" Valid Password Is %s", isValidPassword);
            if (!isValidPassword) {
                return giveResponse(req, res, false, 400, "Invalid Email or password.", {});
            }        
        var token = jwt.sign({ userId: user._id, email: user.email }, "KEY-TEST-PROJECT#Secret");
        var result = {};
        result.username = user.username;
        result.email = user.email;
        result.profilePic = user.profilePic;
        result.token = token;
        return giveResponse(req, res, true, 200, "Login Successfully.", result);
    }
    catch (err) {
        console.log(err);
        return giveResponse(req, res, false, 400, "Something went wrong", {});
    }
    
};

async function createAcc(req, res, next) {
    try {
        const { username, password, email } = req.body;
        const existingUser = await usermodel.findOne({ email });
        if (existingUser) {
            return giveResponse(req, res, false, 400, "User already exist, Please signin.", existingUser);
        }
        // const hashedPassword = await bcrypt.hash(password, 10);
        var salt = bcrypt.genSaltSync(10);
        var hashedPassword = bcrypt.hashSync(password, salt);
        var userData = await usermodel.create({
            username: username,
            password: hashedPassword,
            email: email,
        });
        await userData.save();
        return giveResponse(req, res, true, 200, "Signup Successfully..!", userData);
    } catch (err) {
        console.log(err);
        return giveResponse(req, res, false, 400, "Something went wrong", {});
    }
}

async function updateProfile(req, res, next) {
    try {
        const email = req.email;
        console.log(`email from token is ${email}`);
        const updatedData = await usermodel.findOneAndUpdate({ email }, req.body, { new: true });
        if (!updatedData) {
            return giveResponse(req, res, false, 400, "No user found ", {});
        }
        return giveResponse(req, res, true, 200, "Update profile Successfully..!", updatedData);
    } catch (err) {
        console.log(err);
        return giveResponse(req, res, false, 400, "Something went wrong", {});
    }
}




exports.login = login; 
exports.authenticate = authenticate;
exports.createAcc = createAcc;
exports.updateProfile  = updateProfile;


