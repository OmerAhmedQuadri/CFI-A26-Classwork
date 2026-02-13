const arr = [12, 32, 54, 96]

// const index = arr.findIndex( (ele) => {
//     if (ele>50) return true
// })

// console.log(index)


const res = arr.indexOf(12, 2)
console.log(res)

// ---------------------------
const fruits = ['apple', 'banana', 'orange', 'banana'];

const bananaAt = fruits.indexOf('banana', 2)
console.log(bananaAt)


const arr2 = [22, 34, NaN, 55 ]

const res2 = arr2.indexOf(NaN)
console.log(res2)