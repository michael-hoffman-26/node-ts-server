

console.log(`callin ${isAnagram("a", "ab")}`)
function isAnagram(s: string, t: string): boolean {
    const sArray = s.split('')
    const tArray = t.split('')

    const firstS: Record<string, number> = sArray.reduce((all, currentChar) => {
            if(all[currentChar]) {
                all[currentChar] +=1
            } else {
                all[currentChar] =1
            }

            return all
        }
        , {})

    let flag = true

    tArray.forEach(tChar => {
        if(firstS[tChar]){
            firstS[tChar] -= 1
        } else {
            flag  = false
            return false
        }
    })
    if(!flag) {
        return flag
    }

    return Object.values(firstS).every( n => n === 0 )
};

function isAnagram22(s: string, t: string): boolean {
    const sArray = s.split('')
    const tArray = t.split('')

    const firstS: Map<string, number> = sArray.reduce((all, currentChar) => {
            if(all.has(currentChar)) {
                const value =  all.get(currentChar)
                all.set(currentChar, value+1)
            } else {
                all.set(currentChar, 1)
            }

            return all
        }
        , new Map())

    let flag = true

    tArray.forEach(tChar => {
        if(firstS.has(tChar)){
            // firstS[tChar] -= 1
            const value =  firstS.get(tChar)
            // @ts-ignore
            firstS.set(tChar, value - 1)
        } else {
            flag  = false
            return false
        }
    })
    if(!flag) {
        return flag
    }

    return Array.from(firstS.values()).every( n => {
            return n === 0
        }
    )
};