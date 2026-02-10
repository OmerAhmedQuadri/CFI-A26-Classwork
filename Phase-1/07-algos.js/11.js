const arr = [12, 9, 2, 8, 6, 4]

const bubbleSort = (arr) => {

    if(!Array.isArray(arr)) return undefined

    for(let i = 0; i < arr.length; i++) {
        for(let j = 0; j < arr.length-i-1; j++) {
            if (arr[j] > arr[j+1]){
                let temp = arr[j]
                arr[j] = arr[j+1]
                arr[j+1] = temp
            }
        }
        console.log(arr)
    }
    return arr
}

console.log(bubbleSort(arr))

// const sayHello = name => 'Hello '+name

// const sayHelloo = function (name) {
//     return 'Hello '+name
// }


// console.log(sayHello('omer'))