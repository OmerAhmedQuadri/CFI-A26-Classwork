import readlineSync from 'readline-sync'

let name1 = readlineSync.question('Enter your name: ')
let age = readlineSync.questionInt('Enter you age: ')
let company = readlineSync.question('Where do you work: ')

console.log('\n Output:')

console.log(`Hii ${name1} 
Your age is: ${age}
Your working at: ${company}
    `)


// console.log(`hello
// world`)

