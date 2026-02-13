// function specialFunction(func) {
//     func()
//     console.log(func)
// }

const callThreeTimes = function (func) {
    for (let i = 0; i < 3; i++) {
        func(i)
    }
    console.log(func)
}

// function sayHello() {
//     console.log('Hello world')
// }
// const sayHello = function() {
//     console.log('Hello world')
// }

// const sayHello = () => {
//     console.log('Hello world')
// }
// const sayHello = (a,b=5) => a+b
// console.log(sayHello(2))

callThreeTimes( (i) => {
    console.log('Hello world '+i)
    return 
})

