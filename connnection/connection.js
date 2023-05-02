const mongoose = require('mongoose');
const express = require('express');
require('dotenv').config();
const giveResponse = require("../utils/giveResponse");
const geoip = require('geoip-lite');
const login = require("../modules/authentication/apis/login.js")



const app = express();
app.use(express.json());


const checkLocation = async (req, res, next) => {
    const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress; 
    const geo = await geoip.lookup(clientIP); 
    console.log(`middle ware is working... ${clientIP}`);
    // console.log(`IP Location is ${geo.city}`);
    if (geo && geo.country != 'IN') {
        return giveResponse(req, res, false, 400, "Service is not available in your country..", {});
    }
    next();
};

app.use(checkLocation);
app.use(login.authenticate);

mongoose.connect(process.env.MONGO_URI).then(() => { 
    console.log('Database connected successfully.. ');
});

const PORT = process.env.PORT ?? 4000;
app.listen(PORT, (err) => { 
    if (err) {
        console.log(' Error is %s', err);
    } else { 
        console.log(' API LISTENING on %s', PORT);   
    }
});



module.exports = {mongoose, app};
// exports.module = app;

// module.exports = app; 