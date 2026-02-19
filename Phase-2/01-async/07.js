console.log('Hello');
setTimeout((id) => {
    const user = {
        name: 'John Doe',
        age: 25
    };
    console.log(`User ID: ${id} : User Name : ${user.name}, User Age: ${user.age}`);
}, 5000, 1200);

setTimeout(() => {
    console.log('Im First');
}, 1000);

setTimeout(() => {
    console.log('I am second');
}, 1500);