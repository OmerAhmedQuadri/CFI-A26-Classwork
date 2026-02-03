let matrix = [
    [11, 22, 33],
    [111, 222, 333, 444],
    [1000, 2000, 3000],
]
// matrix[0][0] = matrix[0][0]*10
// matrix[0][0] *= 10
// // console.log(matrix[0][0])
// // for (let i = 0; i < matrix.length; i++) {
// //     console.log(matrix[i])
// // }
let sum = 0
for (let i = 0; i < matrix.length; i++) {

    for (let j = 0; j < 3; j++){
        sum = sum+matrix[i][j]
        console.log(matrix[i][j])
    }
}
console.log(sum)//------------------------------
for (let i = 0; i < matrix.length; i++) {

    for (let j = 0; j < 3; j++){
        matrix[i][j] = matrix[i][j]*10
        console.log(matrix[i][j])
    }
}
// console.log(matrix)


// let arr = [23, 54, 66, 99]
// let sum = 0
// for (let i = 0; i < arr.length; i++) {
//     console.log(arr[i])
//     sum = sum + arr[i]
// }