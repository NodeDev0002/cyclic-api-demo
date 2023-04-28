const mongoose = require('mongoose');
const express = require('express');
require('dotenv').config();


const app = express();
app.use(express.json());

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