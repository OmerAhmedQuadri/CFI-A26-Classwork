let i = 10
setTimeout(() => {
    console.log(i);
    for (i = 0; i < 5; i++) {
        console.log(i)
    }
}, 2000);

// let i = 10
for (i = 0; i < 8; i++) {
    setTimeout(() => {
        console.log(i)
    }, 3000);
}
console.log(i);
