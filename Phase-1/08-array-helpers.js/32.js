const arr = [21, 100, 1, 2, 1000]

console.log(arr)
arr.sort( (a, b) => {
    console.log(a, b)
    return b-a
})
console.log(arr)

/*
[ 21, 100, 1, 2, 1000 ]
100 21
1 100
1 100
1 21
2 21
2 1
1000 21
1000 100
[ 1, 2, 21, 100, 1000 ]
*/