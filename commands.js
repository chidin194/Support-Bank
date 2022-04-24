const {csvParser, getTransactions, validateTransactions} = require('./csvParser');
const {jsonParser} = require('./jsonParser');
const xmlParser = require('./xmlParser');
const {Bank} = require('./classes');

const importFile = async (file) => {

    const userFileType = file.split(".")[1];

    if (userFileType === 'csv') {
        const result = csvParser(file)
        return result;
    } else if (userFileType === 'json') {
        return jsonParser(file);
    } else if (userFileType === 'xml') {
        return xmlParser(file)
    }
}

const listAll = async (transactions) => {

    let newBank = new Bank([]);
    const t = await transactions;

    t.forEach(transaction => {
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
}

const listAccountTransactions = (file, userCommand) => {

    const transactions = importFile(file);

    let userTransactionList = []
    transactions.forEach(transaction => {
        if (transaction.accountFrom === userCommand
            || transaction.accountTo === userCommand) {
            userTransactionList.push(transaction)
        }
    })

    console.log(`
                        Total transactions found: ${userTransactionList.length}`)

    for (const t of userTransactionList) {
        console.log(`
                        ${t.date}: ${t.accountFrom} paid £${t.amount} to ${t.accountTo}
                        Ref: ${t.narrative}`);
    }
}



module.exports = {importFile, listAll, listAccountTransactions}