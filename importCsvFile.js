const log4js = require('log4js');
const fs = require("fs");
const moment = require("moment");
const csvToObj = require('csv-to-js-parser').csvToObj;

const importCsvFile = (fileName) => {

    const csvTransactions = fs.readFileSync(fileName, 'utf-8');
    const transactions = csvToObj(csvTransactions);

    return transactions;
}

module.exports = {importCsvFile}

