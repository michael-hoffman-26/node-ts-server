console.log('Hello World')

function solve(board: string[][]): void {

    const letterX = "X"
    const letter0 = "O"
    function recursiveChange (x,y, resultsX ) {
        const results = resultsX

        if (x === 0 || y ===0 || x === board.length -1 || y === board[0].length -1) {
            return results.add("false")
        }


        if (board[x][y+1] === letter0){
            const code = JSON.stringify({x,y: y+1})
            if (!results.has(code)){
                results.add(code)
                recursiveChange(x, y+1, results)
            }
        }
        if (board[x][y-1] === letter0){
            const code = JSON.stringify({x,y: y-1})
            if (!results.has(code)){
                results.add(code)
                recursiveChange(x, y-1, results)
            }
        }
        if (board[x+1][y] === letter0){
            const code = JSON.stringify({x: x+1,y})
            if (!results.has(code)){
                results.add(code)
                recursiveChange(x+1, y, results)
            }
        }
        if (board[x-1][y] === letter0){
            const code = JSON.stringify({x: x-1,y})
            if (!results.has(code)){
                results.add(code)
                recursiveChange(x-1, y, results)
            }
        }

        return results
    }

    for (let x = 0; x < board.length; x++) {
        for (let y = 0; y < board[0].length; y++) {
            if (board[x][y] === letter0) {
                const responses = Array.from(recursiveChange(x,y, new Set([JSON.stringify({x,y})])))
                if (responses.every(res => res !=='false')){
                    //
                    // do color replace all x with y
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    responses.forEach((res) => {
                        if (typeof res === "string") {
                            const formatedRes = JSON.parse(res)

                            board[formatedRes?.x][formatedRes?.y] = letterX
                        }
                    })

                }
            }
        }
    }
};

const testInput = [["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]]
console.log(`calling solve: ${solve(testInput)}`)
