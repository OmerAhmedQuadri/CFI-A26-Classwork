
let user = {
    name: 'omer',
    age: 21,
    // city: 'hyderabad'
}

function test(usr) {
    const {age, name, city = 'blr', pin = 5000} = usr
    console.log(age, name, city, pin)
    console.log(usr)
}


test(user)