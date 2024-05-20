function solution(A: number[]): number {
    // Implement your solution here
    if (A.length === 1) {
        return A[0]
    }

    let totalRevenue = 0
    let canSell = true
    let canBuy = false

    let bestSell = A[0]
    let bestBuy = -1
    for (let i = 0; i < A.length; i++) {
        const nextNumber = A[i + 1] || -1

        if(canSell) {
            bestSell = Math.max(bestSell, nextNumber)
        } else if (canBuy) {
            bestBuy = Math.min(bestBuy, nextNumber)
        }
        if (bestSell > nextNumber && canSell) {
            // Do Sell
            totalRevenue += bestSell
            canSell = false
            canBuy = true
            bestSell = -1
            bestBuy = nextNumber
            continue
        } else if (bestBuy < nextNumber && canBuy) {
            // Do Buy
            totalRevenue -= bestBuy
            bestBuy = -1
            bestSell = nextNumber
            canSell = true
            canBuy = false
        }
    }

    return totalRevenue
}




// function solution(D: number[], X: number): number {
//     // Implement your solution here
//     console.log(D, X)
//     if (D.length === 1) {
//         return 1
//     }
//     let daysCounter = 1
//     for (let i = 0; i < D.length - 1; i++) {
//         const currentNumber = D[i]
//         const nextNumber = D[i + 1]
//         const diff = Math.abs(currentNumber - nextNumber)
//         console.log(currentNumber, nextNumber, diff)
//         if ( diff <= X) {
//             // continue
//         } else {
//             daysCounter++
//         }
//     }
//
//     return daysCounter
// }