import fs from 'fs'

console.log('Start');

let data = fs.readFileSync('file.txt')
data = data.toString()
console.log(data);

console.log('End');