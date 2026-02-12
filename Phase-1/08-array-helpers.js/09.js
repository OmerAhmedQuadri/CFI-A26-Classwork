const nums = [1, 2, 3, 4, 5]

// const sum = nums.reduce((acc, curr) => {
//     console.log(acc, curr)
//     // return acc + curr
// }, 0)

const sum = nums.reduce((acc, curr) => acc+curr, 0)
console.log(sum)

// const prod = nums.reduce((acc, curr) => {
//     console.log(acc, curr)
//     return acc * curr
// }, 1)

// console.log(prod)