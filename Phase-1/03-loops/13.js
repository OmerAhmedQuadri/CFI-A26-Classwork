// write a program to print even numbers <= n

// let i = 2
// let max = 10
// // while (i<=max){
// //     console.log(i)
// //     i+=2
// // }

// while (i<=max){
//     if (i%2 == 0){
//         console.log(i)
//     }
//     i++
// }


// write a program to print first n even numbers

// let i = 2
// let max = 10
// max = max*2
// while (i<=max){
//     console.log(i)
//     i+=2
// }


// let i = 1
// let n = 5
// let even_number = 2

// while (i<=n){ // 1, 2, 3, 4, 5

//     console.log(even_number) // 2, 4, 6, 8, 10

//     even_number = even_number + 2
//     i++
// }



// let i = 1
// let n = 5

// while (i<=n){
//     console.log(i*2)
//     i++
// }


let i = 1
let n = 5
let even_numbers = []

while (i<=n){
    even_numbers.push(i*2)
    i++
    console.log(even_numbers)
}
console.log(even_numbers)