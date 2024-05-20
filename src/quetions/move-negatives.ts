// you can write to stdout for debugging purposes, e.g.
console.log("This is a debug message");

// [-1, 2, 3  ]
//
/*
#1.
    lastIndex = 2
    i = 0
    sfter swap
    [3, 2, -1]
*/

// [-1, -2, -3]
//
/*
#1.
    lastIndex = 2
    i = 0
    last is negative
    lastindex = 1

*/

// [-1, 2, -3]
//
/*
#1.
    lastIndex = 2
    i = 0
    last is negative
    lastindex = 1

    //
    [2, -1, -3 ]
    lastIndex = 1
    i = 3

*/

const replaceNegatives = (nums: number[]): void => {
    let lastIndex = nums.length - 1
    for(let i = 0; i <= lastIndex; i++){
        if(nums[lastIndex] < 0) {
            lastIndex--
            i--
        }
        else if(nums[i] < 0) {
            const temp = nums[lastIndex]
            nums[lastIndex] = nums[i]
            nums[i] = temp

            lastIndex--
        }
    }
}