const nums = [23, 54, 66, 99, 62, 84]

const newArr = nums.reduce( (acc, curr) => {
    console.log(acc, curr)
    acc.push(curr)

    return acc
}, [])

console.log(newArr)