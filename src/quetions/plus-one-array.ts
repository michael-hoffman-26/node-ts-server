
function plusOne(digits: number[]): number[] {
    let isAddedFlag = false
    for (let i = digits.length -1; i >= 0;  i--) {
        if (digits[i] === 9) {
            // continue
            digits[i] = 0
        } else {
            digits[i] = digits[i] + 1
            isAddedFlag = true
            break
        }
    }

    if (!isAddedFlag) {
        digits.unshift(1)
    }

    return digits
};