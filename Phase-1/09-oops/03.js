/**
 * updateBalance(bal) : balance
 * isAdult() : true/false
 * updateAge(age) : new age
 * getBalance() : balance
 */


const user = {
    name: 'omer',
    age: 21,
    balance: 101,

    isAdult: function(){
        return this.age>=18
    },
    getDetails: function() {
        return `Name: ${this.name}
Age: ${user.age}
Balance: ${this.balance}`
    },
    updateBalance: function(bal){
        if(isNaN(bal) || bal<0 || typeof(bal)!='number') return null
        this.balance = bal
        return this.balance
    },
    updateAge: function(age) {
        if(isNaN(age) || age<0 || typeof(age)!='number') return null
        this.age = age
        return this.age
    },
    getBalance: function() {
        return this.balance
    }

}
console.log(user.getDetails())
console.log(user.isAdult())
console.log(user.getBalance())
console.log(user.updateAge(1))
console.log(user.updateBalance(-1))
console.log(user.getDetails())