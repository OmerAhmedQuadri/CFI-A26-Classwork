let nums = [21, 23, 34, 65, 76, 98, 104]
let tar = 76

let left = 0
let right = nums.length-1
let mid = (left + right)/2
let found = false

while (right>=left) {
    mid = (left+right)/2
    if (nums[mid] == tar){
        found = true
        break
    }
    else if (nums[mid]<tar) {
        left = mid+1
    } else {
        right = mid-1
    }
}

if(found)
    console.log('Element found at '+mid)
else 
    console.log('Element not found')