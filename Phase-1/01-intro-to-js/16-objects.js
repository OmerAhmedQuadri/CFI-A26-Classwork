// // // // // const person = {
// // // // //     'full name': 'omer',
// // // // //     age:21
// // // // // }

// // // // // // person.name = 'omer ahmed'
// // // // // // console.log(person)

// // // // // person.address = 'hyderabad'
// // // // // // console.log(person)

// // // // // // person.fullname = person.name
// // // // // // console.log(person)

// // // // // // delete person.name
// // // // // // console.log(person)

// // // // // console.log(person['full name'])

// // // // // // console.log(person['address'])



// // // // // let person = {
// // // // //     name : 'omer',
// // // // //     age : 23,
// // // // //     suject: 'js',
// // // // //     address: {
// // // // //         door_number: 12,
// // // // //         area: 'masabtank'
// // // // //     }
// // // // // }

// // // // // console.log(person.name)
// // // // // console.log(person.address)
// // // // // console.log(person['address']['door_number'])



// // // // let person = {
// // // //     name : 'omer',
// // // //     age : 23,
// // // //     suject: 'js',
// // // // }

// // // // let address = {
// // // //     door_number: 12,
// // // //     area: 'masabtank'
// // // // }

// // // // let user = {
// // // //     personl_details: person,
// // // //     residence: address
// // // // }
// // // // console.log(user)



// // // let obj1 = {
// // //     a: 1,
// // //     b: 2
// // // }

// // // let obj2 = {
// // //     c: 3,
// // //     d: 4
// // // }

// // // let obj3 = {
// // //     obj1,
// // //     obj24 : obj2
// // // }

// // // console.log(obj3.obj24.c)


// // let book = {
// //     title: 'js',
// //     pages: 200
// // }

// // let author = {
// //     author_name: 'ry',
// //     author_age: 20
// // }

// // let mergedObject = {
// //     ...book, ...author
// // }

// // console.log(mergedObject)


// let fruits = {
//     1: 'mango',
//     2: 'banana',
//     3: 'kiwi'
// }

// let veggies = {
//     4: 'tomato',
//     5: 'potato',
//     3: 'carrot'
// }
// // console.log(veggies)


// let basket = {
//     ...veggies,
//     ...fruits
// }

// console.log(basket)



let database = [
    {
        name: 'maseeh',
        age: 23,
        subject: 'js'
    },
    {
        name: 'yashwant',
        age: 23,
        subject: 'nodejs'
    },
]
// database.pop()
console.log(database[0])