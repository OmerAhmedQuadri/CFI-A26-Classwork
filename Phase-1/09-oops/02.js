const user = {
    name: 'omer',
    age: 21,
    balance: 101,
    getDetails: function() {
        return `Name: ${this.name}
Age: ${user.age}
Balance: ${this.balance}`
    },
    updateBalance: function(b){
        if(b<0) return undefined
        this.balance = b
        console.log(this.balance)
    }
}

console.log(user)
console.log(user.getDetails)
user.getDetails()
user.updateBalance(50)
user.getDetails()