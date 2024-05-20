console.log(`calling minDepth: ${singleNumber([2,2,1])}`)
function singleNumber(nums: number[]): number {
    const uniqueNumberMap = nums.reduce((allNums: Map<number, number>, currentValue) => {
        if (allNums.has(currentValue)) {
            allNums.delete(currentValue)
        } else {
            allNums.set(currentValue, 1)
        }

        return allNums
    }, new Map())

    return uniqueNumberMap.keys().next().value
};