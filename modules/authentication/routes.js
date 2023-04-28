const connection = require('./connnection/connection');
// const login = require("./apis/login.js");



// function authenticate(req, res, next) {
//     const authHeader = req.headers['authorization'];
//     if (!authHeader) {
//         return res.status(401).send('Unauthorized');
//     }
//     const token = authHeader.split(' ')[1];
//     // Verify the token
//     jwt.verify(token, jwtsecretKey, (err, decoded) => {
//         if (err) {
//             return res.status(401).send('Unauthorized');
//         }
//         req.email = decoded.email;
//         req.userId = decoded.userId;
//         next();
//     });
//     console.log(' --- TOKEN IS --- %s', token);
// }

async function  generateToken(email, userId)  { 
    var token = await jwt.generateToken({ email: email, userId: userId }, jwtsecretKey); 
    return token; 
};

// connection.app.post('/login', authenticate, (req, res) => { }); 

