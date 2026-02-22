
console.log('Start')
let count = 5
const id = setInterval(() => {
    console.log(count--);
    if(count == 0) {clearInterval(id)
        console.log(id);
    }
}, 1000);
console.log(id);
console.log('The End');