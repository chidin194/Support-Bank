const {importCsvFile} = require('./importCsvFile');
const {importJsonFile} = require('./importJsonFile');
const {importXmlFile} = require('./importXmlFile');
const {Account, Transaction, Bank} = require('./classes');
const log4js = require("log4js");
const logger = log4js.getLogger('program.js');
const moment = require('moment');



const importFile = (file) => {

    const userFileType = file.split(".")[1];

    if (userFileType === 'csv') {
        return importCsvFile(file);
    } else if (userFileType === 'json') {
        return importJsonFile(file);
    } else if (userFileType === 'xml') {
        return importXmlFile(file);
    }
}

const listAll = (transactions) => {

    let newBank = new Bank([]);

    transactions.forEach(transaction => {
        for (let key in transaction) {
            if (key === "accountFrom" || key == "accountTo") {
                if (newBank.accountList.indexOf(transaction[key]) < 0) {
                    newBank.accountList.push(transaction[key])
                }
            }
        }
    });

    for (const account in newBank.accountList) {
        console.log(newBank.accountList[account]);
    }

    return newBank;
}

const listAccountTransactions = (transactions, user) => {

    let userTransactionList = []
    let accountBalance = 0;

    transactions.forEach(transaction => {
        if (transaction.accountFrom === user
            || transaction.accountTo === user) {
            userTransactionList.push(transaction)
        }
    })

    if(userTransactionList.length === 0){
        const e = 'Unable to find account holder. Please try again'
        logger.error(e)
        console.log(e)
        return
    }


    for(let i=0; i < userTransactionList.length; i++) {
        const t = userTransactionList[i];
        if(user === t.accountTo) {
            accountBalance += t.amount;
        } else if (user === t.accountFrom) {
            accountBalance -= t.amount;
        }
    }

    console.log(`
                        Total transactions found: ${userTransactionList.length}
                        Account balance: ${accountBalance.toFixed(2)}`)

    for (const t of userTransactionList) {
        console.log(`
                        ${t.date}: ${t.accountFrom} paid £${t.amount} to ${t.accountTo}
                        Ref: ${t.narrative}`);
    }

}





module.exports = {importFile, listAll, listAccountTransactions}