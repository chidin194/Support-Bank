class Account {
    constructor(accountName, transactionList, balance) {
        this.accountName = accountName;
        this.transactionList = transactionList;
        this.balance = balance;

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
    constructor(accountList) {
        this.accountList = accountList;
    }
}

// export { Account, Transaction, Bank }

module.exports = { Account, Transaction, Bank }