const { Parser, parse } = require('json2csv');
const fs = require('fs');

const exportCsvFile = (transactions) => {

    try {
        const parser = new Parser({});
        const csv = parser.parse(transactions);
        fs.writeFileSync('transactions.csv', csv)
        console.log('File is now available to view')
    } catch (err) {
        console.error(err);
    }
}

module.exports = {exportCsvFile}