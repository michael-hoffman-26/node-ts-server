export function findMin(nums: number[]): number {
    let l = 0
    let r = nums.length - 1
    let minNum = nums[0]


    while(l<=r) {
        let m = Math.floor((r-l)/2 + l)
        
        console.log( l, m, r);
        // if we have a stright line, the numbers are going up. 
        // then we can take the smallest number
        if(nums[l] < nums[r]) {
            minNum = Math.min(minNum, nums[l])
            break;
        }

        // taking min from the middle
        minNum = Math.min(minNum, nums[m])

        
        if (nums[m] >= nums[l]) {
            l = m +1
        } else {
            r = m - 1
        }
    }

    return minNum
};