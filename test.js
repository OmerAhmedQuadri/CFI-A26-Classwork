let user = {
    name: 'omer',
    age: 21
}

let userDetails = {
    age: 22,
    city: 'hyderabad'
}

user = { ...userDetails, ...user}
console.log(user);