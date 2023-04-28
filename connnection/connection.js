const mongoose = require('mongoose');
const express = require('express');

const app = express();
app.use(express.json());

var mongoUrl = "mongodb+srv://testrtemp22:dXCOfJxwgAZBsN3U@testdababase.ljo4iq2.mongodb.net/user-management-system";
mongoose.connect(mongoUrl).then(() => { 
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