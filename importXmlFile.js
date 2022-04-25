const fs = require('fs');
const jsdom = require("jsdom");
const {Transaction} = require('./classes.js')
const log4js = require('log4js');
const {checkTransactions} = require("./errorHandling");
const logger = log4js.getLogger('program.js');

const importXmlFile = (fileName) => {

    const xml = fs.readFileSync(fileName, 'utf-8');
    const dom = new jsdom.JSDOM(xml);

    const xmlTransactions = dom.window.document.getElementsByTagName("SupportTransaction");
    let transactions = []

    for (let i = 0; i < xmlTransactions.length; i++) {
        const t = xmlTransactions[i];
        const newTransaction = new Transaction(
            new Date(Date.UTC(0, 0, t.attributes[0].textContent - 1, 0, 0, 0))
                .toLocaleDateString(),
            t.getElementsByTagName("From")[0].textContent,
            t.getElementsByTagName("To")[0].textContent,
            t.getElementsByTagName("Description")[0].textContent,
            +t.getElementsByTagName("Value")[0].textContent,
        )
        transactions.push(newTransaction)
    }
    return transactions;
}

module.exports = {importXmlFile}
