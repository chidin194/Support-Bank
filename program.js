const {Bank, Transaction, Account} = require('./classes.js')
const fs = require('fs');
const ps = require('prompt-sync');
const log4js = require('log4js');
const moment = require('moment');
const {importFile, exportFile, listAll, listAccountTransactions} = require('./commands')
const {checkTransactions} = require("./errorHandling");
const {exportXmlFile} = require("./exportXmlFile");
const {exportCsvFile} = require("./exportCsvFile");

const prompt = ps();
const logger = log4js.getLogger('program.js');


log4js.configure({
    appenders: {
        file: {type: 'fileSync', filename: 'logs/debug.log'}
    },
    categories: {
        default: {appenders: ['file'], level: 'debug'}
    }
});

const runProgram = () => {
    while (true) {
        const userFile = prompt("Please enter a file name:")

        const transactions = importFile(userFile);

        checkTransactions(transactions);

        const userCommand = prompt("Please enter a command:")

        if (userCommand.match(/list all/ig)) {
            listAll(transactions);
        } else if (userCommand.match(/List.*/ig)) {
            try {
                listAccountTransactions(transactions, userCommand.substring(5));
                const exportChoice = prompt("Would you like to export your transactions? (Y/N)", "", {})

                if(exportChoice === 'Y') {
                    const exportFormat = prompt("Please enter an export format(csv/json/xml)");
                    const exportTransactions = listAccountTransactions(transactions, userCommand.substring(5));
                    exportFile(exportFormat, exportTransactions);
                } else {
                    return
                }
            } catch {
                logger.error(`Unable to process file. Please review`)
                return
            }
        } else {
            console.log(`${userCommand} is not a recognised command. Please try again`)
            return
        }
    };
}

runProgram();