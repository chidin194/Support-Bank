const moment = require("moment");
const {Transaction} = require("./classes");
const log4js = require("log4js");
const logger = log4js.getLogger('program.js');

const isDateValid = (d) => moment(d, 'DD/MM/YYYY', true).isValid();

const isAmountValid = (a) => {

    if (!parseFloat(a) || a.split('.')[1].length !== 2) {
        return false
    }
    return true
}

const checkTransactions = (transactions) => {

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
                return transactions
            }
        } catch (err) {
            logger.error(err);
            return
        }
    })
}

module.exports = {isDateValid, isAmountValid, checkTransactions}