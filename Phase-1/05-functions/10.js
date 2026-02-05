// recursive functions

function rec (num){
    if (num == 5) return
    rec (num++)
    console.log(num)
}

rec(0)