import readlineSync from 'readline-sync'


let len = readlineSync.questionInt('Enter the len of the array: ')

console.log(len)

let arr = []

for(let i = 0; i< len; i++) {
    arr[i] = readlineSync.questionInt(`Enter the ${i+1} element: `)
}
console.log(arr)