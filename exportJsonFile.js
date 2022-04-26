const fs = require("fs");

const exportXmlFile = (transactions) => {
    fs.writeFileSync('transactions.json', transactions)
    console.log('File is now available to view')
}

module.exports = {exportXmlFile}