// let arr = [0, 1, 2, 3, 4, 5, 6]

// let newArr = arr.map((ele) => {
//     if(ele%2==0)
//         return ele
//     else 
//         return false
// })

// console.log(newArr)

// const giveEven = (arr) => {
//     let arr2 = []
//     for(let i = 0; i<arr.length; i++){
//         if(arr[i]%2==0) arr2.push(arr[i])
//     }
//     return arr2
// }
// const newArr = giveEven(arr)

// let newArr = arr.filter((ele) => {
//     if (ele%2 == 0){
//         return true
//      }
// })

// let newArr = arr.filter( ele => ele%2==0 ? true : false )

// console.log(newArr)


let arr = [22, 55, 1, 76, 9, 10, 32, 0]

let newArr = arr.filter((ele) => {
    // return ele <= 10
    if (ele <= 10) return true
})
console.log(newArr)