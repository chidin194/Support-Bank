const moment = require("moment");
const {Transaction} = require("./classes");
const log4js = require("log4js");
const logger = log4js.getLogger('program.js');

const isDateValid = (d) => moment(d, 'DD/MM/YYYY', true).isValid();

const isAmountValid = (a) => {

    if (!parseFloat(a) || a.toString().split('.')[1].length !== 2) {
        return false
    }
    return true
}

const checkTransactions = (transactions) => {

    transactions.forEach(transaction => {

        try {
            isDateValid(transaction.date);
            parseFloat(transaction.amount);

            if (!isDateValid(transaction.date)) {
                logger.error(`Date is not in a valid format for transaction dated ${transaction.date}`)
            } else if (!isAmountValid(transaction.amount)) {
                logger.error(`Please provide a suitable value for field 'amount' for transaction
                dated ${transaction.date}. Note that this must be a number with two decimal places`)
                return
            } else {
                return transactions
            }
        } catch (err) {
            logger.error(err);
            return
        }
    })
}

module.exports = {isDateValid, isAmountValid, checkTransactions}