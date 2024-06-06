console.log('Hello World')

/**
 Do not return anything, modify nums in-place instead.
 */
function rotate(nums: number[], k: number): void {
    if(nums.length === 1) {
        return
    }
    k = k % nums.length
    const startsArray: number[] = nums.slice(0, k)
    const finishArray: number[] = nums.slice(k)
    if (finishArray.length === 0) {
        return
    }


    finishArray.forEach((finishNum, index, finishArr) => {
        nums[(k - index -1)] = finishArr[finishArr.length - index -1]
    })


    for (let i = 0; i < k; i++) {
        nums[(k + i )  % nums.length] = startsArray[i]
    }
    for (let i = 0; i < finishArray.length - k; i++) {
        nums[k*2 + i] = finishArray[i]
    }

    console.log(nums)
};


console.log(`Hello World ${rotate([1,2,3], 2)}`)
