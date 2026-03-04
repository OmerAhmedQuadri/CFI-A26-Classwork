import fs from 'fs/promises'
import { hashPassword, comparePassword } from './01-bcrypt.js'
import { question, questionInt } from 'readline-sync'
import { sendEmail } from './05.js'

const createUser = async () => {
    const newUser = {
        id: Date.now(),
        email: question('Please enter you email: '),
        password: question('Create a password: '),
        confirm: question('Confirm your password: '),
        verified: false,
        otp: null
    }
    const data = await fs.readFile('./users.json', 'utf-8')
    const users = JSON.parse(data)

    const existingUser = users.find((usr) => {
        return usr.email == newUser.email
    })

    if (existingUser) return console.log('User already exists!');

    delete newUser.confirm

    // console.log(user);
    newUser.password = await hashPassword(newUser.password)
    // console.log(user)


    users.push(newUser)
    await fs.writeFile('./users.json', JSON.stringify(users, null, 4))
}

const login = async () => {
    const email = question('Please enter email: ')
    const password = question('Enter your password: ')

    const data = await fs.readFile('./users.json', 'utf8')
    const users = JSON.parse(data)
    // console.log(users);
    const user = users.find((usr) => {
        return usr.email == email
    })
    if (!user) return console.log('User not found!');
    const auth = await comparePassword(password, user.password)
    if (!auth) return console.log('Invalid password!');

    if (!user.verified) return console.log('Please verify before login!');
    console.log('Welcome ' + user.email + '!');
}

const generateOtp = async () => {
    const max = 999999
    const min = 100000
    return Math.floor( Math.random() * (max - min + 1) ) + min
}

const sendOtp = async () => {
    const email = question('Email: ')

    const data = await fs.readFile('./users.json', 'utf8')
    const users = JSON.parse(data)
    const userIndex = users.findIndex((usr) => {
        return usr.email == email
    })
    if (userIndex == -1) return console.log('User not found!');
    if (users[userIndex].verified) return console.log('User already verified!');

    const otp = generateOtp()
    users[userIndex].otp = otp
    console.log('OPT: ' + otp);

    await sendEmail({
        to: email,
        otp
    })

    await fs.writeFile('./users.json', JSON.stringify(users, null, 4))
}

const verifyUser = async () => {
    const email = question('Email: ')
    const otp = questionInt('otp: ')

    const data = await fs.readFile('./users.json', 'utf8')
    const users = JSON.parse(data)
    const userIndex = users.findIndex((usr) => {
        return usr.email == email
    })
    if (userIndex == -1) return console.log('User not found!');
    if (users[userIndex].verified) return console.log('User already verified!');

    if(users[userIndex].otp != otp) return console.log('Invalid otp');

    users[userIndex].verified = true
    await fs.writeFile('./users.json', JSON.stringify(users, null, 4))
    console.log('Verified successfully✅');

}






const app = async () => {
    while (true) {

        console.log('\n===MENU===');
        console.log('0. Exit');
        console.log('1. Create user');
        console.log('2. Login');
        console.log('3. Send OTP');
        console.log('4. Get verified');
        const choice = questionInt('Enter you choice: ')

        switch (choice) {
            case 0:
                return;
            case 1:
                await createUser()
                break;
            case 3:
                await sendOtp()
                break;
            case 4:
                await verifyUser()
                break
            case 2:
                await login()
                break
            default:
                break;
        }
    }

}

app()