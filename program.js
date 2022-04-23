const {Bank} = require('./classes.js')
const {Transaction} = require('./classes.js')
const {Account} = require('./classes.js')
const csv = require('csv-parser');
const fs = require('fs');
const ps = require('prompt-sync');
const prompt = ps();
const log4js = require('log4js');
const logger = log4js.getLogger('program.js');
const moment = require('moment');
const {csvParser, getTransactions, validateTransactions} = require('./csvParser');
const {jsonParser} = require('./jsonParser');
const xmlParser = require('./xmlParser');

log4js.configure({
    appenders: {
        file: {type: 'fileSync', filename: 'logs/debug.log'}
    },
    categories: {
        default: {appenders: ['file'], level: 'debug'}
    }
});

// logger.info("Test log")

const runProgram = () => {

    let userFile = prompt("Please enter a file name:")
    // let userCommand = prompt("Please enter a command:")

    const userFileType = userFile.split(".")[1];

    if (userFileType === 'csv') {
        csvParser(userFile);
        getTransactions(userFile);
        validateTransactions(userFile);
    } else if (userFileType === 'json') {
        jsonParser(userFile);
    } else if (userFileType === 'xml') {
        xmlParser(userFile)
    }



    // MOVE TO BANKING COMMANDS
    // let newBank = new Bank([])
    // transactions.forEach(transaction => {
    //     for (let key in transaction) {
    //         if (key === "From" || key == "To") {
    //             if (newBank.accountList.indexOf(transaction[key]) < 0) {
    //                 newBank.accountList.push(transaction[key])
    //             }
    //         }
    //     }
    // });

    // error handling

    //
    // if (userCommand === "List All") {
    //     for (const account in newBank.accountList) {
    //         console.log(newBank.accountList[account]);
    //     }
    // } else if (userCommand) {
    //     let userTransactionList = []
    //     transactionList.forEach(transaction => {
    //         if (transaction.accountFrom === userCommand.substring(5)
    //             || transaction.accountTo === userCommand.substring(5)) {
    //             userTransactionList.push(transaction)
    //         }
    //     })
    //
    //     console.log(`
    //                     Total transactions found: ${userTransactionList.length}`)
    //
    //     for (const t of userTransactionList) {
    //         console.log(`
    //                     ${t.date}: ${t.accountFrom} paid £${t.amount} to ${t.accountTo}
    //                     Ref: ${t.narrative}`);
    //     }
    // }

}


runProgram();



