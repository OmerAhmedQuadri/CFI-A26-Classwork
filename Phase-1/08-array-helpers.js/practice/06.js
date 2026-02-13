const user = {
    name: 'omer',
    age: 21,
    city: 'hyd'
}

function test (usr){
    const {name, ...restVals} = usr
    console.log(name, restVals)
}


test(user)