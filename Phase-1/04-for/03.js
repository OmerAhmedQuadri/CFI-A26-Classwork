let max = 5

for(let rows = 0; rows < max; rows++){
    let str = ''
    for(let cols = 0; cols <= rows; cols++){
        // console.log(rows, cols)
        str = str + rows + cols
    }
    console.log(str)
}
/*
00
01
02
03
04
10
11
12
13
14
20
21
22
23
24
30
31
32
33
34
*/

// let i = 0
// let j = 0

// while (i < 5) {
//     j = 0
//     while (j < 3) {
//         console.log('i:', i, 'j:', j)
//         j++
//     }
//     i++
// }


// let i = 1
// while (i <= 3){

//     let j = 1
//     while (j <= 2) {
//         console.log('omer')
//         j++
//     }
//     i++
// }

// while (i<3){
//     console.log('i: '+i)
//     i++
//     while (j < 4){
//         console.log('j: '+j)
//         j++
//     }
//     j = 1
// }


// for(let i = 1; i <= 3; i++){
//     for(let j = 1; j <= 2; j++){
//         console.log('omer') // 1, 2, 3, 4, 5, 6
//     }
// }

// let i = 1
// while (i<4){
//     let name = 'omer'
//     console.log(name)
//     i++
// }