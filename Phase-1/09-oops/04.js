class User {
    #balance = 0
    constructor(name, age, bal) {
        this.name = name
        this.age = age
        this.#balance = bal
    }
    getBalance() {
        return this.#balance
    }
    deposite(amt){
        if(isNaN(amt) || amt<0 || typeof(amt)!='number') return null
        this.#balance += amt
        return this.#balance
    }
    withdraw(amt){
        if(isNaN(amt) || amt<0 || typeof(amt)!='number' || amt>this.#balance) return null
        this.#balance -= amt
        return this.#balance
    }
}

const user1 = new User('omer', 21, 101)
console.log(user1)
console.log(user1.getBalance())

user1.deposite(100)
console.log(user1.getBalance())

user1.withdraw(50)
console.log(user1.getBalance())
// console.log(user1)