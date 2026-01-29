import readlineSync from 'readline-sync'
// do {
//     console.log('hello')
// } while (false);


// let i = 900
// let max = 100

// do {
//     if(i%3==0)
//         console.log(i)
//     i++
// } while (i<=max)



// let oneTimePassword = 4444
// let userInput
// do {
//     userInput = readlineSync.questionInt('Enter the one time password: ')
// } while (oneTimePassword !== userInput);

// console.log('User logged in successfully!!')



let oneTimePassword = 4444
let userInput
let count = 0
let allowedAttempts = 5
let loginStatus = true
do {
    if(allowedAttempts == count) {
        loginStatus = false
        break
    }
    count++
    userInput = readlineSync.questionInt('Enter the one time password: ')
} while (oneTimePassword !== userInput);

loginStatus ? console.log('User logged in successfully!!'):console.log('failed')