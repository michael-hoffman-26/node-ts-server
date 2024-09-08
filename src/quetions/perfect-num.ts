// import sumOfSquaredDigits from "./sum_of_squared_digits.js";

// Helper function that calculates the sum of squared digits.
function sumOfSquaredDigits(number: number): number {
    let totalSum = 0;
    while (number > 0) {
        let digit = number % 10; // Extract the digit before division
        number = Math.floor(number / 10); // Update the number
        totalSum += digit ** 2;
    }
    return totalSum;
}

export function isHappyNumber(n: number): boolean{
    let slowPointer = n
    let fastPointer = sumOfSquaredDigits(n)

    while (slowPointer !== fastPointer){
        if (slowPointer === 1 || fastPointer === 1){
            return true
        }
        slowPointer = sumOfSquaredDigits(slowPointer)
        const temp = sumOfSquaredDigits(fastPointer)
        fastPointer = sumOfSquaredDigits(temp)

        if (slowPointer === fastPointer){
            return false
        }
        
    }
    return false

}

