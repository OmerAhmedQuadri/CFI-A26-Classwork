
// user = {
//     name: 'omer',
//     city: 'Hyderabad',
//     age: 21
// }
// const address = {
//     door: 15,
//     state: 'ts'
// }
// // const {name, ...items} = {user}
// const newUser = {...user, ...address}
// const {name, ...items} = newUser

// console.log(newUser)
// console.log(name, items)

const add = (...items) => {
    console.log( items)
}

add('omer', 1, 2, 3, 4, 5)