const csv = require('csv-parser');
const fs = require('fs');

// let accountList = [];
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
    const result = await getTransactions();
    return result
}

const transactions = runProgram();

transactions.forEach(transaction => {
    for (let key in transaction) {
        console.log(`${key}: ${transaction[key]}`);
    }
});





