const {Bank} = require('./classes.js')
const {Transaction} = require('./classes.js')
const {Account} = require('./classes.js')
const fs = require('fs');
const ps = require('prompt-sync');
const prompt = ps();
const log4js = require('log4js');
const logger = log4js.getLogger('program.js');
const moment = require('moment');
const {importFile, listAll, listAccountTransactions} = require('./commands')
const {checkTransactions} = require("./errorHandling");
const {exportXmlFile} = require("./exportXmlFile");
const {exportCsvFile} = require("./exportCsvFile");


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
    do {
        let userFile = prompt("Please enter a file name:")

        const transactions = importFile(userFile);

        checkTransactions(transactions);

        let userCommand = prompt("Please enter a command:")

        if (userCommand === 'List All') {
            listAll(transactions);
        } else if (userCommand.match(/List.*/g)) {
            try {
                listAccountTransactions(transactions, userCommand.substring(5));
                let exportChoice = prompt("Would you like to export your transactions? (Y/N)")

                if(exportChoice === 'Y') {
                    let exportFormat = prompt("Please enter an export format(csv/json/xml)");
                    const exportTransactions = listAccountTransactions(transactions, userCommand.substring(5));
                    if(exportFormat === 'csv') {
                        exportCsvFile(exportTransactions)
                    } else if (exportFormat === 'xml') {
                        exportXmlFile(exportTransactions);
                    } else if (exportFormat === 'json') {
                        console.log(exportTransactions)
                    }
                } else {
                    return
                }
            } catch {
                logger.error(`Unable to process file. Please review`)
                return
            }
        }


        // let exportChoice = prompt("Would you like to export your transactions? (Y/N)")
        //
        // if(exportChoice === 'Y') {
        //     let exportFormat = prompt("Please enter an export format(csv/json/xml)");
        //     const exportTransactions = listAccountTransactions(transactions, userCommand.substring(5));
        //     if(exportFormat === 'csv') {
        //         exportCsvFile(exportTransactions)
        //     } else if (exportFormat === 'xml') {
        //         exportXmlFile(exportTransactions);
        //     } else if (exportFormat === 'json') {}
        //     console.log(exportTransactions)
        // } else {
        //     return
        // }

    } while(true);

}

runProgram();





