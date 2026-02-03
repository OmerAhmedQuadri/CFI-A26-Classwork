// write a function named userDetails that takes user input for user name and user role and prints it to the console

import readlineSync from 'readline-sync'
function userDetails () {
    let username = readlineSync.question('Enter username: ')
    let userrole = readlineSync.question('Enter the user role: ')
    // console.log(username)
    // console.log(userrole)

    // let user = {
    //     name: username, 
    //     role: userrole
    // }
    return {username, userrole}
}

let user = userDetails()
console.log(user)