// const fs = require('fs');
// const os = require('os');

giveResponse = async (req, res, status, statusCode, message, model) => {
    console.log("giveResponse :: %s", message);
    console.log(` Request IP Address is ${req.socket.remoteAddress}`);
    var StringMSG = status == true ? "\n 🟢 " + Date().toLocaleString() + " || " + message + " || " + req.url + " || " : "\n 🔴 " + Date().toLocaleString() + " || " + message + " || " + req.url + " || ";
    console.log("giveResponse :: %s", StringMSG);
    // fs.writeFile('api-log.csv', StringMSG, { flag: 'a' }, (err) => {
    //     if (err) {
    //         console.error(err);
    //     } else {
    //         console.log('Data written to log.txt successfully!');
    //     }
    // });
    return res.status(statusCode).json({ status: status, message: message, data: model });
};

module.exports = giveResponse