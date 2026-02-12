const fruitsArray = ['apple', 'mango', 'anas', 'apple', 'orange', 'mango', 'mango']


const fruitsObject = fruitsArray.reduce( (acc, fruit) => {
    console.log(acc, acc[fruit], fruit)
    if(!acc[fruit]) acc[fruit] = 1
    else acc[fruit] += 1

    return acc
}, {})

console.log(fruitsObject)


// // const fruits = {
// //     mango: 2
// // }

// // if (fruits['apple'] == undefined) fruits.apple = 1
// // // else fruits['mango']++

// // console.log(fruits)

// // const user = {
// //     name: "omer"
// // }

// // console.log(user)

// // user.city = 'hyderabad'
// // user.city = 'banglore'

// // console.log(user.age)

// const user = {
//     name: 'omer',
//     age: 17
// }

// const key = 'name'
// console.log(user[key])