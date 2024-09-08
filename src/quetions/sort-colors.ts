function sortColors(colors: number[]): number[]{
    let l = 0
    let r = colors.length - 1
    while(l <= r){
        if(colors[l] === 2){
            colors.splice(l, 1)
            colors = colors.concat(2)
            r--
            continue
        }
        if (colors[r] === 0){
            colors.splice(r, 1)
            colors.unshift(0)
            l++
            continue
        }
        l++
        r--
    }

    return colors;
}

const inputColors = [1,2,1]

console.log(sortColors(inputColors))