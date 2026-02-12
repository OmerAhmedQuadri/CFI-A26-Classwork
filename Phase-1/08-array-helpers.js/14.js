
// const nums = [23, 54, 96, 108, 73]

// const res = nums.find( (n) => {
//     if(n%2==0) return true
// } )

// const res2 = nums.find( (n) => n>100)

// console.log(res)
// console.log(res2)

const users = [
    { name: 'omer', age: 170},
    { name: 'zayd', age: 23},
    { name: 'taha', age: 22},
    { name: 'fahad', age: 21},
    { name: 'atif', age: 21},
    { name: 'yash', age: 21},
    { name: 'haseeb', age: 20},
    { name: 'a rahman', age: 22},
    { name: 'anas', age: 24},
    { name: 'maseeh', age: 23},
    { name: 'afnan', age: 23},
]


const res = users.find( (usr) => {
    if(usr.age > 23 && usr.age < 100) return true
})

console.log(res)