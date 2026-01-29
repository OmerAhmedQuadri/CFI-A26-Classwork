// write a program to calculate the sum of first n natural numbers
import readlineSync from 'readline-sync'

let i = 1
let max = readlineSync.questionInt('Enter a natural numbers: ')
let sum = 0

while (i<=max) {
    sum = sum + i
    // console.log(sum, i)
    i++
}
console.log('final sum: ', sum)