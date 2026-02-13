const fruits = ['banana', 'orange', 'apple', 'mango', 'grapes']

console.log('original:', fruits)
let res
// res = fruits.splice(1, 2, 'anas', 'berries')
res = fruits.splice(1, 0, 'anas', 'berries')

const index = fruits.indexOf('anas')
if(index != -1){
    fruits.splice(index, 1)
}

console.log('fruits:',fruits)
console.log('result:',res)