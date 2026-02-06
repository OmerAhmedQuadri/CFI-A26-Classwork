import readline from 'readline-sync'

let num = readline.questionInt('Enter a number to check armstrong: ')
let temp1 = num
let temp2
// let count = 0
let arr = []

while (temp1) {
    // count++
    temp2 = temp1%10
    arr.push(temp2)
    temp1 = Math.trunc(temp1/10)
}
// console.log(arr.length, arr)

let sum = 0
for (let i = 0; i < arr.length; i++) {
    arr[i] = Math.pow(arr[i], arr.length)
    sum += arr[i]
}
// console.log(arr)
// console.log(sum, num)

sum==num?console.log('Its a armstrong number'): console.log('Its not an armstrong number')