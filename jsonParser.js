const fs = require('fs');
const {Transaction} = require('./classes.js')
const log4js = require('log4js');
const logger = log4js.getLogger('program.js');


const jsonParser = (fileName) => {
    try {
        const jsonString = fs.readFileSync(fileName, 'utf-8')
        const result = JSON.parse(jsonString);
        let transactions = [];

        for(const t of result) {
            t.Date = new Date();
            const newTransaction = new Transaction(
                t.Date.toLocaleDateString(),
                t.FromAccount,
                t.ToAccount,
                t.Narrative,
                t.Amount
            )
            transactions.push(newTransaction);
        }
        return transactions;
    }

    catch(err) {
        logger.error("Unable to parse JSON, please review the file and rerun the program")
        return
    }
}

module.exports = {jsonParser}



