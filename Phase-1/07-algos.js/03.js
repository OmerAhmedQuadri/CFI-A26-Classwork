let nums = [22, 34, 65, 76, 98, 104, 21]
let tar = 76

function linearSearch(arr, target) {
    if (!Array.isArray(arr)) {
        console.log('Please enter a valid array!')
        return
    }

    for (let i = 0; i< arr.length; i++) {
        if (arr[i] == target) return i
    }
    return -1
}

console.log(linearSearch(nums, tar))