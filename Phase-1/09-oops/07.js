class User {
    #balance = 0
    static branch = 'Masab Tank'
    constructor(name, age, city, bal) {
        User.validateUserDetails(name, age, city, bal)
        this.name = name.trim()
        this.age = age
        this.city = city.trim()
        this.#balance = bal
    }

    static validateUserDetails(name, age, city, bal ){
        if(!name || typeof(name)!='string' || name.trim().length < 3){
            throw new Error('Please enter a valid name')
        }
        
        if(!age || typeof(age)!='number' || isNaN(age) || age<18 || age>100){
            throw new Error('Please enter a valid age')
        }
        
        if(!city || typeof(city)!='string' || city.trim().length < 3){
            throw new Error('Please enter a valid city')
        }

        if(!bal || typeof(bal)!='number'|| isNaN(bal) || bal<0 || bal>10000 ){
            throw new Error('Please enter a valid amount')
        }
        
    }

    getDetails() {
        console.log(`Name: ${this.name}\nAge: ${this.age}\nCity: ${this.city}\nBranch: ${this.branch}`)
    }
    withdraw(bal) {
        if (!bal || typeof(bal)!='number' || isNaN(bal) || bal<1 || bal>10000){
            throw new Error('Please enter a valid amount to withdraw')
        }
        if(this.#balance<bal){
            throw new Error('amount cannot be greater than existing balance')
        }
        this.#balance -= bal
        return this.#balance
    }
}

const omer = new User('Omer', 21, 'Hyderabad', 100)
console.log(omer)

omer.withdraw(50)