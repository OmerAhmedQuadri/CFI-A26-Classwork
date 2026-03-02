import fs from 'fs/promises'
import { hashPassword, comparePassword } from './01-bcrypt.js'
import { question, questionInt } from 'readline-sync'

const createUser = async () => {
    const user = {
        id: Date.now(),
        username: question('Enter the name of the user: '),
        password: question('Create a password: '),
        confirm: question('Confirm your password: ')
    }
    const data = await fs.readFile('./users.json', 'utf-8')
    const users = JSON.parse(data)

    const existingUser = users.find((usr) => {
        return usr.username == user.username
    })

    if (existingUser) return console.log('User already exists!');

    while (user.password != user.confirm) {
        console.log('Passwords donot match');
        user.password = question('Create a password: ')
        user.confirm = question('Confirm your password: ')
    }

    delete user.confirm

    // console.log(user);
    user.password = await hashPassword(user.password)
    // console.log(user)


    users.push(user)
    await fs.writeFile('./users.json', JSON.stringify(users, null, 4))
}

const login = async () => {
    const username = question('Please enter username: ')
    const password = question('Enter your password: ')

    const data = await fs.readFile('./users.json', 'utf8')
    const users = JSON.parse(data)
    // console.log(users);
    const user = users.find((usr) => {
        return usr.username == username
    })
    if (!user) return console.log('User not found!');
    const auth = await comparePassword(password, user.password)
    if (!auth) return console.log('Invalid password!');
    console.log('Welcome ' + user.username + '!');
}




const app = async () => {
    while (true) {

        console.log('\n===MENU===');
        console.log('0. Exit');
        console.log('1. Create user');
        console.log('2. Login');
        const choice = questionInt('Enter you choice: ')

        switch (choice) {
            case 0:
                return;
            case 1:
                await createUser()
                break;
            case 2:
                await login()
                break;
            default:
                break;
        }
    }

}

app()