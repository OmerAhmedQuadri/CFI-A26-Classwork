// const num = 56235466.89
const num = [56235466.89, 4567.89, 974345778.8679]

console.log(num)
// console.log(num.toLocaleString())
// console.log(num.toLocaleString('en-IN'))
console.log(num.toLocaleString('en-US', {
    style: 'currency',
    currency: 'EUR'
}))
console.log(num.toLocaleString('en-US', {
    style: 'currency',
    currency: 'INR'
}))
console.log(num.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD'
}))
// console.log(num.toLocaleString('en-EU'))
// console.log(num.toLocaleString('de-DE'))


// console.log(typeof num.toLocaleString())