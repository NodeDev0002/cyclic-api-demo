const CsvToJson = require('csvtojson');
const giveResponse = require('../utils/giveResponse');



async function convertToJson(req, res) {
    try {
        const csvString = req.file.buffer.toString();
        const jsonArray = await CsvToJson().fromString(csvString);
        return giveResponse(req, res, true, 200, "Mne Google Pay $55 Kri Dejo..  ", jsonArray);

        res.json(jsonArray);
    } catch (err) {
        console.error(err);
        return giveResponse(req, res, false, 400, "Google Pay Kro Pela Pchi Avjo.. ", {});
    }
};


module.exports = {   convertToJson}; 
