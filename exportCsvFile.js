const { Parser } = require('json2csv');
const { parse } = require('json2csv');

const exportCsvFile = (transactions) => {

    try {
        const parser = new Parser(0);
        const csv = parser.parse(transactions);
        console.log(csv);
    } catch (err) {
        console.error(err);
    }
}

module.exports = {exportCsvFile}