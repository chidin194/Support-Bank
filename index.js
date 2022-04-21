
const {Bank} = require('./classes.js')
const {Transaction} = require('./classes.js')
const {Account} = require('./classes.js')
const csv = require('csv-parser');
const fs = require('fs');
const ps = require('prompt-sync');
const prompt = ps();




let transactions2014Json = [];

function csvToJson() {
    return new Promise((resolve,reject)=> {
        let result = [];
        fs.createReadStream('Transactions2014.csv')
            .pipe(csv())
            .on('data', (data) => result.push(data))
            .on('end', () => {
                if (result) {
                    resolve(result)
                } else {
                    reject(Error("No data was found in the .csv"))
                }
            })
    })}


const getTransactions = async() => {
    transactions2014Json = await Promise.resolve(csvToJson())
    return transactions2014Json;
}

const runProgram = async () => {

    let userCommand = prompt("Please enter a command:")

    const transactions = await getTransactions();
    let newBank = new Bank([])

    transactions.forEach(transaction => {
        for (let key in transaction) {
            if (key === "From" || key == "To") {
                if (newBank.accountList.indexOf(transaction[key]) < 0) {
                    newBank.accountList.push(transaction[key])
                }
            }
        }
    });

    let transactionList = [];
    transactions.forEach(transaction => {
        let newTransaction = new Transaction(
            transaction.Date,
            transaction.From,
            transaction.To,
            transaction.Narrative,
            transaction.Amount
        )
        transactionList.push(newTransaction);
    })


        if (userCommand === "List All") {
            console.log(newBank.accountList.toString());
        } else if (userCommand ) {
            let userTransactionList = []
            transactionList.forEach(transaction => {
                if (transaction.accountFrom === userCommand.substring(5)|| transaction.accountTo === userCommand.substring(5)) {
                    userTransactionList.push(transaction)



                }
            })

            console.log(`
                        Total transactions found: ${userTransactionList.length}`)

            for (const t of userTransactionList)
            {
                console.log(`
                        ${t.date}: ${t.accountFrom} paid £${t.amount} to ${t.accountTo}
                        Ref: ${t.narrative}`);
            }
        }

}


runProgram();



