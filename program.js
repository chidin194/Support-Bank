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
const {importFile, listAll, listAccountTransactions} = require('./commands')

log4js.configure({
    appenders: {
        file: {type: 'fileSync', filename: 'logs/debug.log'}
    },
    categories: {
        default: {appenders: ['file'], level: 'debug'}
    }
});

// logger.info("Test log")

const runProgram = async () => {

    let userFile = prompt("Please enter a file name:")

    const file = await importFile(userFile);

    let userCommand = prompt("Please enter a command:")

    if(userCommand === 'List All') {
        listAll(importFile(userFile));
    } else if(userCommand === 'List' + userCommand.substring(5)) {
        try {
            listAccountTransactions(file, userCommand.substring(5));
        }
        catch {
            logger.error(`'${userCommand}' is not a recognised command`)
            return
        }
    }






    // userCommand.substring(5)

    // else if (userCommand) {
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



