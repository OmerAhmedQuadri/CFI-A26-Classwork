const user = {
    name: 'omer',
    age: 21,
    balace: 101,
    getDetails: function() {
        console.log('this is a user method')
    }
}

console.log(user)
console.log(user.getDetails)
user.getDetails()