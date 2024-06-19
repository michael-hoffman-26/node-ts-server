const input = [10,8,7,5,2]
class NumArray {
    constructor(private nums: number[]) {
        this.nums = nums
        this.updateSum()
    }
    private updateSum (){
        for (let i = 1; i < this.nums.length; i++) {
            this.nums[i] = this.nums[i] + this.nums[i-1]
        }
    }

    sumRange(left: number, right: number): number {
        if (right<left){
            return 0
        }
        if (left === 0){
            return this.nums[right]
        }
        return this.nums[right] - this.nums[left -1]
    }
}

/**
 * Your NumArray object will be instantiated and called as such:
 * var obj = new NumArray(nums)
 * var param_1 = obj.sumRange(left,right)
 */

const obj = new NumArray(input)
const left = 3;
const right = 4;
const result = obj.sumRange(left,right)


console.log(`calling ${result}`)