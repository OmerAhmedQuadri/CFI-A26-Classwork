let nums = [21, 23, 34, 65, 76, 98, 104]
let tar = 104

function binarySearch(arr, target) {

    let right = arr.length -1
    let left = 0
    let mid = (left+right)/2

    while (left<=right) {

        mid = (left + right)/2

        if(arr[mid]==target){
            return mid
        } 
        else if (target > arr[mid]) {
            left = mid+1
        } 
        else {
            right = mid-1
        }
    }
    return -1
}

let index = binarySearch(nums, tar)

if (index == -1)
    console.log('Element not found!')
else 
    console.log('Element found at index: '+index)