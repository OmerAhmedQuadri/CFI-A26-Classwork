const nums = [23, 54, 66, -99, 12, 108, 6]

const max = nums.reduce( (max, curr) => {
    // console.log(max, curr)
    return (max>curr) ? max : curr
}, nums[0])

console.log(max)


const min = nums.reduce( (min, curr) => min<curr? min : curr, nums[0])
console.log(min)

