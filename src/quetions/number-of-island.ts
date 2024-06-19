

export function numIslands(grid: string[][]): number {
    const rows = grid.length
    const columns = grid[0].length

    let numOfIslands = 0
    const visited = new Set()
    function BFS(r,c){
        const p: {r: number, c: number}[] = []
        visited.add(JSON.stringify({r,c}))
        p.push({r, c})

        while (p.length){
            const point = p.shift()
            const directionsA = [[0,1],[0-1],[1,0],[-1,0]] //e
            directionsA.forEach(direction => {
                const rDirection = direction[0]
                const cDirection = direction[1]
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                const rowIndex = rDirection + point?.r
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                const colIndex = cDirection + point?.c
                if ((rowIndex <= rows && rowIndex >=0)
                    && (colIndex <= columns && colIndex >=0)
                    && grid[rowIndex][colIndex] === '1'
                    && !visited.has(JSON.stringify({r: rowIndex, c: colIndex}))){

                    p.push({r: rowIndex, c: colIndex})
                    visited.add(JSON.stringify({r: rowIndex, c: colIndex}))
                }

            })

        }
    }
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if (grid[r][c] === '1' && !visited.has(JSON.stringify({r, c}))){
                BFS(r,c)
                numOfIslands++
            }

        }
    }

    return numOfIslands
};