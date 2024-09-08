// const fib1 = (index: number): number => {
//     if (index===0 || index===1){
//         return 1
//     }
//
//     return fib1(index-1) + fib1(index - 2)
// }
//
// const fib2 = (index: number): number => {
//     if (index===0 || index===1){
//         return 1
//     }
//     let prev2 = 1
//     let prev1 = 1
//     let total;
//
//     for (let i = 2; i <= index; i++) {
//         total = prev2 + prev1
//         prev1 = prev2
//         prev2 = total
//     }
//
//     return prev2
// }
//
//

function validAbbr(text: string, abbr:string): boolean{
    let textIndex = 0
    let abrIndex = 0

    const textArr = text.split('')
    const abbrArr = abbr.split('')
    while (abrIndex < abbrArr.length){
        if (!isNaN(+abbrArr[abrIndex])){
            let number = +abbrArr[abrIndex]
            if (number === 0 ){
                return false
            }
            while (!isNaN(+abbrArr[abrIndex + 1])){
                number = number*10 + +abbrArr[abrIndex + 1]
                abrIndex++
            }

            textIndex += number
            abrIndex++
        } else {
            if (textArr[textIndex] !== abbrArr[abrIndex]){
                return false
            }
            textIndex++
            abrIndex++
            // else continue
        }
    }


    if(textIndex !== textArr.length){
        return false
    } else {
        return true
    }
}

const inputText = "y"

const inputAbbr = "y0"
console.log(`calling fib with indes: ${inputText}, result: ${validAbbr(inputText, inputAbbr)}`)