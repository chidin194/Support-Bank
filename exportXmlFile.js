const json2xml = require('json2xml');

const exportXmlFile = (transactions) => {
    const xmlTransactions = json2xml(transactions, { header: true });
    console.log(xmlTransactions);

}
module.exports = {exportXmlFile}

