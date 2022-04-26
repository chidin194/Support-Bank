class Account {
    constructor(accountName, transactionList, accountBalance) {
        this.accountName = accountName;
        this.transactionList = transactionList;
        this.accountBalance = accountBalance;
    }

    filterTransactions(transactions) {
        transactions.forEach(transaction => {
            if (transaction.accountFrom === this.accountName
                || transaction.accountTo === this.accountName) {
                this.transactionList.push(transaction)
            }
        })
    }

    logTransactions() {
        console.log(` Total transactions found: ${this.transactionList.length}`);

        this.transactionList.map(t => {
            console.log(`
                        ${t.date}: ${t.accountFrom} paid £${t.amount} to ${t.accountTo}
                        Ref: ${t.narrative}`);
        })
    }

    calculateBalance() {

        this.transactionList.forEach(t => {
            if (this.accountName === t.accountTo) {
                this.accountBalance += t.amount;
            } else if (this.accountName === t.accountFrom) {
                this.accountBalance -= t.amount;
            }
        })
    }

    logBalance() {
        console.log(`Account balance: ${this.accountBalance.toFixed(2)}`)
    }
}

class Transaction {
    constructor(date, accountFrom, accountTo, narrative, amount) {
        this.date = date;
        this.accountFrom = accountFrom;
        this.accountTo = accountTo;
        this.narrative = narrative;
        this.amount = amount;
    }
}

class Bank {

    constructor(transactionList, accountList) {
        this.transactionList = transactionList;
        this.accountList = accountList;
    }

        logAccounts() {

            this.transactionList.forEach(transaction => {
                for (let key in transaction) {
                    if (key === "accountFrom" || key == "accountTo") {
                        if (this.accountList.indexOf(transaction[key]) < 0) {
                            this.accountList.push(transaction[key])
                        }
                    }
                }
            });

            this.accountList.map(account => console.log(account));
        }
}

module.exports = { Account, Transaction, Bank }