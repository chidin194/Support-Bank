const log4js = require('log4js');
const fs = require("fs");
const csv = require("csv-parser");
const moment = require("moment");
const {Transaction} = require("./classes");
const logger = log4js.getLogger('program.js');

const csvParser = (fileName) => {
    return new Promise((resolve, reject) => {
        let result = [];

        fs.createReadStream(fileName)
            .pipe(csv())
            .on('data', (data) => result.push(data))
            .on('end', () => {
                if (result) {
                    resolve(result)
                } else {
                    reject(Error("No data was found in the .csv"))
                }
            })
    })
}

const getTransactions = async (fileName) => {
    let transactions = [];
    transactions = await Promise.resolve(csvParser(fileName));
    return transactions;
}

const validateTransactions = async (fileName) => {

    const transactions = await getTransactions(fileName);

    let transactionList = [];

    const isDateValid = (d) => moment(d, 'DD/MM/YYYY', true).isValid();

    const isAmountValid = (a) => {
        if (!parseFloat(a) || a.split('.')[1].length !== 2) {
            return false
        }
        return true
    }

    transactions.forEach(transaction => {

        try {
            isDateValid(transaction.Date);
            parseFloat(transaction.Amount);


            if (!isDateValid(transaction.Date)) {
                logger.error(`Date is not in a valid format for transaction dated ${transaction.Date}`)
            } else if (!isAmountValid(transaction.Amount)) {
                logger.error(`Please provide a suitable value for field 'amount' for transaction 
                dated ${transaction.Date}. Note that this must be a number with two decimal places`)
            } else {
                let newTransaction = new Transaction(
                    transaction.Date,
                    transaction.From,
                    transaction.To,
                    transaction.Narrative,
                    transaction.Amount
                )
                transactionList.push(newTransaction);
                return transactionList
            }
        } catch (err) {
            return
            logger.error(err);
        }
    })
}

module.exports = {csvParser, getTransactions, validateTransactions}

