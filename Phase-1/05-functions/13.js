let arr = [
    1, 2, 
    [
        11, 22, 33
    ], 
    3, 4, 
    [
        55, 66, 
        [
            777, 888
        ]
    ], 
    9, 10
]

// function flat(arr){
//     for(let i = 0; i < arr.length; i++){
//         if(Array.isArray(arr[i])) flat(arr[i])
//         else console.log(arr[i]);
//     }
// }

// flat(arr)


function flat(arr, arr2 = []){
    for(let i = 0; i < arr.length; i++){
        if(Array.isArray(arr[i])) arr2 = flat(arr[i], arr2)
        else arr2.push(arr[i])
    }
    return arr2
}

console.log(flat(arr))