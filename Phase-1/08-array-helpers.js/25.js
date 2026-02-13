const arr1 = [1, 2, 3]
const arr2 = [4, 5, 6]
const arr3 = [7, 8, 9]

const newArr = arr1.concat(100, 101, arr2, arr3)
console.log(arr1)
console.log(arr2)
console.log(arr3)
console.log(newArr)


const newArr2 = [...arr1, 100, 101, ...arr2, ...arr3]
console.log(newArr2)