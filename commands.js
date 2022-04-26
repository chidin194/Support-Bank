const {importCsvFile} = require('./importCsvFile');
const {importJsonFile} = require('./importJsonFile');
const {importXmlFile} = require('./importXmlFile');
const {Account, Transaction, Bank} = require('./classes');
const log4js = require("log4js");
const moment = require('moment');
const {exportCsvFile} = require("./exportCsvFile");
const {exportXmlFile} = require("./exportXmlFile");
const {exportJsonFile} = require('./exportJsonFile');

const logger = log4js.getLogger('program.js');

const importFile = (file) => {

    const userFileType = file.split(".")[1];

    switch(userFileType) {
        case 'csv':
            return importCsvFile(file);
            break;
        case 'json':
            return importJsonFile(file);
            break;
        case 'xml':
            return importXmlFile(file);
            break;
    }
}

const exportFile = (userFileType, transactions) => {

    switch(userFileType) {
        case 'csv':
            return exportCsvFile(transactions);
            break;
        case 'json':
            return exportJsonFile(transactions);
            break;
        case 'xml':
            return exportXmlFile(transactions);
            break;
    }

}

const listAll = (transactions) => {

    let newBank = new Bank(transactions, []);

    newBank.logAccounts();

    return newBank;
}

const listAccountTransactions = (transactions, user) => {

        let account = new Account(user, [], 0);

        account.filterTransactions(transactions);
        account.calculateBalance();
        account.logTransactions();
        account.logBalance();

        if(account.transactionList.length === 0) {
            const e = new Error('Unable to find account holder. Please try again');
            logger.error(e)
            console.log(e)
            return
        }

        return account;
}

module.exports = {importFile, exportFile, listAll, listAccountTransactions}