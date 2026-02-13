const fruits = ['apple', 'banana', 'banana', NaN, 'orange', 'banana'];


const res = fruits.includes('apple')  // true 

const res2 = fruits.includes('apple', 1)  // false

const res3 = fruits.includes(NaN)

console.log(res)
console.log(res2)
console.log(res3)