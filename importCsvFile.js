const log4js = require('log4js');
const fs = require("fs");
const {checkTransactions} = require("./errorHandling");
const {Transaction} = require("./classes");
const csvToObj = require('csv-to-js-parser').csvToObj;

const importCsvFile = (fileName) => {

    const csvTransactions = fs.readFileSync(fileName, 'utf-8');
    const transactions = csvToObj(csvTransactions);

    let transactionList = [];

    transactions.forEach(transaction => {

                let newTransaction = new Transaction(
                    transaction.Date,
                    transaction.From,
                    transaction.To,
                    transaction.Narrative,
                    +transaction.Amount
                )
                transactionList.push(newTransaction);
    })
    return transactionList
}

module.exports = {importCsvFile}

