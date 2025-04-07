// --Q2 ==> instead of 2 numbers to sum target-- > N numbers can sum to target([7, 1, 3], 10) -> true


function isTargetExistsByN(array: number[], target: number): boolean {
    const arraySet = array.reduce((acc, number) => {
        acc.add(number)
        return acc
    }, new Set())
    // {<"7": 1>}
    // {<"1": 1>}
    // {<"3": 1>}
    array.forEach(number => {
        helperSum(arraySet, target, array)
    })

    function helperSum(currentMap: any, target: number, numbersArray: number[]){
        array.forEach(number => {
            if (number === target) {
                return true
            } 
            if (numbersArray.length === 0) {
                return false
            }
            else {
                // const newSet = <"1": "1"> & 1:3
                // const newTarget = target-number
                // const newTarget = 3
                // const newUpdateArray = [1, 3, 5]
                //
                
                // return helperSum(newSet, newTarget, newArray)
            }
        })  
    }

    return false
}