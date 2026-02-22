import fs from 'fs'
import { question, questionInt } from 'readline-sync'

const db = './users.json'

fs.readFile(db, 'utf8', (err, data) => {
    if (err) return console.log(err);

    const users = JSON.parse(data)
    console.log(users)

    console.log('1. Create a new user');
    console.log('2. Delete a existing user');
    console.log('3. Update a existing user');
    const choice = questionInt('Enter your choice: ')

    switch (choice) {
        case 1:
            console.log('Please enter the user details below');
            const user = {
                name: question('Enter the user name: '),
                age: questionInt('Enter the age: '),
                city: question('Enter the city: ')
            }
            users.push(user)
            break;

        case 2:
            const name2 = question('Enter the name of the user you want to delete: ')
            const index2 = users.findIndex((usr)=> usr.name==name2)
            if(index2==-1) return console.log('User not found');
            // console.log(index2);
            users.splice(index2, 1)
            console.log(users);
            break
            
        case 3:
            const name3 = question('Enter the name of the user you want to update: ')
            const index3 = users.findIndex((usr)=> usr.name==name3)
            if(index3==-1) return console.log('User not found');

            console.log('Please enter the user details below');
            const user3 = {
                name: question('Enter the user name: '),
                age: questionInt('Enter the age: '),
                city: question('Enter the city: ')
            }
            users[index3] = user3
            break
        default:
            console.log('Exiting...');
            return;
    }
    fs.writeFile(db, JSON.stringify(users, null, 4), (err) => {
        if (err) return console.log(err);
        console.log('Saved users!');
    })
})