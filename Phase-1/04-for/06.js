
let rows = 4
let cols = 5

for (let i = 1; i <= rows; i++) {
    // console.log(i)
    let str = ''
    for(let j = i; j <= cols+i-1; j++){
        str = str + j + ' '
    }
    // cols++
    console.log(str)
}