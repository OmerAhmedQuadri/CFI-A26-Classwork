// write a program that takes 2 nums and returns their sum

function sum (a = 10, b = 20) {
    console.log('code before return statement')
    return a+b
    console.log('code after return statement')
}
console.log('code before function call')
console.log(sum(5))
console.log('code after function call')