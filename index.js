
const {Bank} = require('./classes.js')
const {Transaction} = require('./classes.js')
const {Account} = require('./classes.js')
const csv = require('csv-parser');
const fs = require('fs');
const ps = require('prompt-sync');
const prompt = ps();
const log4js = require('log4js');
const logger = log4js.getLogger('index.js');
const moment = require('moment');

log4js.configure({
    appenders: {
        file: { type: 'fileSync', filename: 'logs/debug.log' }
    },
    categories: {
        default: { appenders: ['file'], level: 'debug'}
    }
});

// logger.info("Test log")

let transactions2014Json = [];

function csvParser(fileName) {
    return new Promise((resolve,reject)=> {
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
    })}

// function jsonParser(fileName) {
//     let result = [];
//
//     for (const obj of fileName) {
//         JSON.parse(obj)
//         result.push(obj);
//     }
//
//
//
// }


const getTransactions = async(fileName) => {
    transactions2014Json = await Promise.resolve(csvParser(fileName));
    return transactions2014Json;
}

const runProgram = async () => {

    let userFile = prompt("Please enter a file name:")
    let userCommand = prompt("Please enter a command:")

    const transactions = await getTransactions(userFile);
    let newBank = new Bank([])

    transactions.forEach(transaction => {
        for (let key in transaction) {
            if (key === "From" || key == "To") {
                if (newBank.accountList.indexOf(transaction[key]) < 0) {
                    newBank.accountList.push(transaction[key])
                }
            }
        }
    });

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
            }
        }
        catch(err) {
            return
            logger.error(err);
        }

    })


        if (userCommand === "List All") {
            for(const account in newBank.accountList) {
                console.log(newBank.accountList[account]);
            }
        } else if (userCommand ) {
            let userTransactionList = []
            transactionList.forEach(transaction => {
                if (transaction.accountFrom === userCommand.substring(5)
                    || transaction.accountTo === userCommand.substring(5)) {
                    userTransactionList.push(transaction)
                }
            })

            console.log(`
                        Total transactions found: ${userTransactionList.length}`)

            for (const t of userTransactionList)
            {
                console.log(`
                        ${t.date}: ${t.accountFrom} paid £${t.amount} to ${t.accountTo}
                        Ref: ${t.narrative}`);
            }
        }

}


runProgram();



