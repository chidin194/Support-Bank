class Account {
    constructor(accountName, balance) {
        this.accountName = accountName;
        this.balance = balance;
    }
}

class Transaction {
    constructor(date, accountFrom, accountTo, amount, narrative) {
        this.date = date;
        this.accountFrom = accountFrom;
        this.accountTo = accountTo;
        this.amount = amount;
        this.narrative = narrative;
    }
}
