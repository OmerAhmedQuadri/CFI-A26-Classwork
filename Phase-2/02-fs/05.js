import fs from 'fs'

const users = [
    {name: 'Omer', age: 21, city: 'Hyderabad'},
    {name: 'Fahad', age: 21, city: 'Towlichoki'},
    {name: 'Fazal', age: 22, city: 'MasabTank'}
]


console.log(users);
console.log(typeof users);
const data = JSON.stringify(users, null, 4)
console.log(data)
console.log(typeof data)

fs.writeFile('users.json', data, (err) => {
    if(err){
        console.log('Oops: ', err);
        return
    }
    console.log('Data saved successfully!');
})