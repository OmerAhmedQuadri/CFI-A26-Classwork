
let arr = [9, 2, 4, 6, 8, 12]

for(let i = 0; i < arr.length; i++){
    let min = i
    for(let j = i+1; j < arr.length; j++){
        if (arr[min] > arr[j]){
            min = j
        }
    }
    let temp = arr[i]
    arr[i] = arr[min]
    arr[min] = temp
}

console.log(arr)