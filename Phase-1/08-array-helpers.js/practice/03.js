let arr = [1, 2, 3, 4, 5]

let newArr = arr.map( (ele) => {
    if (ele%2==0) return ele
    return 0
})

console.log(arr)
console.log(newArr)