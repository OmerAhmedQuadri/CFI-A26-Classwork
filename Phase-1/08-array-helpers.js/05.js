// const arr = [22, 54, 97, 33, 2, 8]

// let arr2 = arr.map((ele) => {
//     return ele*2
// })

// console.log(arr)
// console.log(arr2)


const arr = [1, 2, 3, 4, 5, 6]

let newArr = arr.map((e, i) => {
    // console.log('hello world')
    console.log(e, i)
    return e*2
})

console.log(newArr)