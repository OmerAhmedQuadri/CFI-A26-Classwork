// // const name = 'yash'
// // const marks = 65
// // if (name=='anas') {
// //     if (marks > 90) {
// //         console.log('anas has scored')
// //     }
// //     else if(marks > 70){
// //         console.log('anas just passed')
// //     }
// //     else{
// //         console.log('anas has failed')
// //     }
// // }
// // else if (name == 'yash'){
// //     if (marks > 90) {
// //         console.log('yash has scored')
// //     }
// //     else if(marks > 60){
// //         console.log('yash just passed')
// //     }
// //     else{
// //         console.log('yash has failed')
// //     }
// // }


// let a = 20
// let b = 50
// let max
// if(a>b) {
//     max = a
// }
// else {
//     max = b
// }

// // string or template literlal - using backticks `
// console.log(`Max value is: ${max}`)
// console.log(`${a}`)



const price = 5000
let discount = 0

if (price >= 1000) {
    discount = 20
} 
else if (price >= 500) {
    discount = 15
} 
else {
    discount = 10
}
console.log(`your discount is ${discount}%`)