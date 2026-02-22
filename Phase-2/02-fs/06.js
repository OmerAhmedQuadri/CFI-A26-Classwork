import fs from 'fs'

fs.readFile('users.json', 'utf-8', (err, data) =>{
    if(err) return console.log(err);
    console.log(data);
    const users = JSON.parse(data)
    console.log(users[0]);
})