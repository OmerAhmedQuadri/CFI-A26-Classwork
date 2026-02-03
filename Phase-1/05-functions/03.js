// let user1 = {
//     name: 'omer',
//     age: 21
// }

// let user2 = {
//     ...user1
// }


// console.log(user2)
let user1 = {
    name: 'omer',
    age: 21
}

let address = {
    city: 'hyderabad',
    pin: 500000
}

let user1withaddress = {...user1}
// user1.name = 'omer ahmed'

user1withaddress.city = address.city
user1withaddress.pin = address.pin

console.log(user1);
console.log(user1withaddress)


// let fruits = {
//     1: 'banana',
//     2: 'apple'
// }
// let veggies = {
//     3: 'totmatos',
//     4: 'potato'
// }
// let basket = {
//     fruits123: fruits,
//     ...veggies
// }

// console.log(basket)