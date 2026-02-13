const fruits = ['banana', 'orange', 'apple', 'mango', 'grapes']

// .slice(start, end(optional) )
// start -- is inclusive
// end -- is exclusive

let res = fruits.slice(1, 4)

console.log(fruits)
console.log(res)


console.log('\n')

res = fruits.slice(-3, -1)
console.log(res)


console.log('\n')

res = fruits.slice(1, -1)
console.log(res)