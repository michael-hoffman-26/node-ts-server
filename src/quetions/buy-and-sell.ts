import * as process from "process";


// console.log(`calling ${maxProfit([2,1,2,10,1])}`)

// dry run
//**

/*
* dry run
* iteration 0:
* profit: 0, buy=2, sell=1
*
* iteration 1:
* profit: 0, buy=2, sell=1
* profit: 1, buy=1, sell=2
* profit: 9, buy=1, sell=10
* */
// profit = 0
// **/

export function maxProfit(prices: number[]): number {
  if (prices.length === 0){
    return 0
  }
  let profit = 0
  let buy = prices[0]
  for (let i = 1; i < prices.length; i++) {
    const sell = prices[i]
    if (sell > buy) {
      profit = Math.max(profit, sell - buy)
    }
    else {
      buy = sell
    }
  }

  return profit
}