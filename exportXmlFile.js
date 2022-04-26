const json2xml = require('json2xml');
const fs = require("fs");

const exportXmlFile = (transactions) => {
    const xmlTransactions = json2xml(transactions, { header: true });
    fs.writeFileSync('transactions.xml', xmlTransactions)
    console.log('File is now available to view')
}

module.exports = {exportXmlFile}