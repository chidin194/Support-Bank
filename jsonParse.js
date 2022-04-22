const fs = require('fs');
const jsdom = require("jsdom");
const {Transaction} = require('./classes.js')



// function jsonParser(fileName) {
//     try {
//         const jsonString = fs.readFileSync(fileName, 'utf-8')
//         const transactions = JSON.parse(jsonString);
//         return transactions
//     }
//
//     catch(err) {
//         logger.error("Unable to parse JSON")
//         return
//     }
// }

function xmlParser(fileName) {
    const xml = fs.readFileSync(fileName, 'utf-8');
    const dom = new jsdom.JSDOM(xml);

    const test = dom.window.document.querySelector("Parties").textContent;
    const list = dom.window.document.getElementsByTagName("SupportTransaction");

    for(let i = 0; i < list.length; i++) {
        const newTransaction = new Transaction(
            list[i].attributes[0].textContent,
            list[i].getElementsByTagName("From")[0].textContent,
            list[i].getElementsByTagName("To")[0].textContent,
            list[i].getElementsByTagName("Description")[0].textContent,
            list[i].getElementsByTagName("Value")[0].textContent,
            
        )

        console.log(newTransaction);

    }


}


xmlParser('Transactions2012.xml');




