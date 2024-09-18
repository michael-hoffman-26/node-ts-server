function findRepeatedSequences(dna: string, k: number): Set<string> {

    // Replace this placeholder return statement with your code
    const setsHashMap = new Map()
    const aStr = dna.substring(0, k)
    console.log(aStr, aStr.length);
    
    let startIndex = 0
    let endIndex = k 
    
    while(endIndex <= dna.length){
        const currentSeq = dna.substring(startIndex, endIndex)
        const hashValue = setsHashMap.get(currentSeq)
        if(hashValue){
            setsHashMap.set(currentSeq, hashValue+1)
        } else {
            setsHashMap.set(currentSeq, 1)
        }

        startIndex++
        endIndex++
    }

    setsHashMap.entries((key, valu))

    return new Set();
}

export { findRepeatedSequences };