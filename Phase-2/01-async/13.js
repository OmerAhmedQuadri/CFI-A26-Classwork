console.log('Lets start');

let id = setTimeout(() => {
    console.log('Am in the middle')
}, 2000)
console.log(id);
clearTimeout(id)

console.log('Im out');